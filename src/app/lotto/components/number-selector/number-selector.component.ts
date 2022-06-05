import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ObjectMap} from '@tk-ui/others/types';
import {ObjectUtil} from '@tk-ui/utils/object.util';
import {MessageService} from '@tk-ui/components/message/message.service';

/**
 * The number selector for manual selecting page.
 */
@Component({
  selector: 'app-number-selector',
  templateUrl: './number-selector.component.html',
  styleUrls: ['./number-selector.component.scss']
})
export class NumberSelectorComponent implements OnInit {
  /**
   * Selected emitter.
   */
  @Output() selected = new EventEmitter<number[]>();

  /**
   * Numbers.
   */
  numbers: number[] = [];

  /**
   * Map of selected numbers.
   */
  selectedNumbersMap: ObjectMap<boolean> = {};

  /**
   * Selected numbers.
   */
  private _selectedNumbers: number[] = [];

  constructor(
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this._createNumbers();
  }

  /**
   * Get state of whether all numbers are selected or not.
   */
  get allSelected(): boolean {
    return this.selectedNumbers.length === 6;
  }

  /**
   * Set selected numbers and update map of selected numbers.
   * @param numbers - New selected numbers.
   */
  set selectedNumbers(numbers: number[]) {
    this._selectedNumbers = numbers;
    this.selectedNumbersMap = ObjectUtil.getUniqueKeys(this._selectedNumbers);
  }

  /**
   * Get selected numbers.
   */
  get selectedNumbers(): number[] {
    return this._selectedNumbers;
  }

  /**
   * TrackBy function for numbers.
   * @param index - The index.
   */
  numberTrackBy(index: number): number {
    return index;
  }

  /**
   * Toggle selected number by adding to/removing from `selectedNumbersMap`.
   * @param num - The number to toggle.
   */
  toggleSelectedNumber(num: number): void {
    const index = this.selectedNumbers.indexOf(num);

    if (index === -1) {
      // Only add a new number when not all numbers selected.
      if (!this.allSelected) {
        this.selectedNumbers = [...this.selectedNumbers, num];
      } else {
        this._showMaximumSelectedMessage();
      }
    } else {
      this.selectedNumbers = this.selectedNumbers.filter(_num => _num !== num);
    }
  }

  /**
   * Emit `selected` emitter..
   */
  emitSelected(): void {
    // Emit with numbers when all numbers are selected.
    // If not, emit with an empty array.
    if (this.allSelected) {
      this.selected.emit(this.selectedNumbers);
    } else {
      this.selected.emit([]);
    }
  }

  /**
   * Create numbers.
   */
  private _createNumbers(): void {
    this.numbers = [];

    for (let i = 0; i < 45; i++) {
      this.numbers.push(i + 1);
    }
  }

  /**
   * Show the message when user trying to select more than 6 numbers.
   */
  private _showMaximumSelectedMessage(): void {
    this.messageService.info('최대 6개의 번호만 선택 가능합니다.');
  }
}
