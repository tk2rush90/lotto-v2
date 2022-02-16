import {Component, OnInit} from '@angular/core';
import {DrawLogic, LottoService} from '@lotto/services/common/lotto.service';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {LottoResult} from '@lotto/models/lotto-result';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';

@Component({
  selector: 'app-lotto-form',
  templateUrl: './lotto-form.component.html',
  styleUrls: ['./lotto-form.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class LottoFormComponent implements OnInit {

  // Available lotto numbers.
  numbers: number[] = [];

  // Selected numbers.
  selectedNumbers: number[] = [];

  // Selected numbers map.
  selectedNumbersMap: { [k: number]: boolean } = {};

  // Auto drawing logic.
  logic: DrawLogic = this.lottoService.lastSelectedLogic;

  // Ranged lotto results.
  private _results: LottoResult[] = [];

  constructor(
    private lottoService: LottoService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get the state of default logic selected.
   */
  get isDefault(): boolean {
    return this.logic === 'default';
  }

  /**
   * Get the state of weighted1 logic selected.
   */
  get isWeighted1(): boolean {
    return this.logic === 'weighted1';
  }

  /**
   * Get the state of weighted2 logic selected.
   */
  get isWeighted2(): boolean {
    return this.logic === 'weighted2';
  }

  ngOnInit(): void {
    this._initialize();
    this._subscribeRangedLottoResults();
  }

  /**
   * Toggle the number selection when number clicked.
   * @param num Clicked number.
   */
  onClickNumber(num: number): void {
    this._toggleSelectedNumber(num);
  }

  /**
   * Reset the number selection.
   */
  resetSelection(): void {
    this.selectedNumbers = [];
    this._createSelectedNumbersMap();
    this._updateSelectedNumbers();
  }

  /**
   * Set the logic value on default checkbox changed.
   * @param state Changed state.
   */
  onLogicDefaultChanged(state: boolean): void {
    if (state) {
      this.logic = 'default';
      this.lottoService.lastSelectedLogic = this.logic;
    }
  }

  /**
   * Set the logic value on weighted checkbox changed.
   * @param state Changed state.
   */
  onLogicWeighted1Changed(state: boolean): void {
    if (state) {
      this.logic = 'weighted1';
      this.lottoService.lastSelectedLogic = this.logic;
    }
  }

  /**
   * Set the logic value on weighted checkbox changed.
   * @param state Changed state.
   */
  onLogicWeighted2Changed(state: boolean): void {
    if (state) {
      this.logic = 'weighted2';
      this.lottoService.lastSelectedLogic = this.logic;
    }
  }

  /**
   * Automatically draw the numbers by specific logic.
   */
  autoDrawNumbers(): void {
    let numbers: number[] = [];

    this.resetSelection();

    switch (this.logic) {
      case 'default': {
        numbers = this.lottoService.drawNumbersByDefaultLogic();
        break;
      }

      case 'weighted1': {
        numbers = this.lottoService.drawNumbersByWeighted1Logic(this._results);
        break;
      }

      case 'weighted2': {
        numbers = this.lottoService.drawNumbersByWeighted2Logic(this._results);
        break;
      }
    }

    numbers.forEach(item => this._toggleSelectedNumber(item));
  }

  /**
   * Initialize the component.
   */
  private _initialize(): void {
    this.numbers = LottoUtil.getNumbers();

    this._createSelectedNumbersMap();

    // Get the saved last selected numbers.
    const selectedNumbers = this.lottoService.lastSelectedNumbers;

    selectedNumbers.forEach(item => this._toggleSelectedNumber(item));
  }

  /**
   * Subscribe ranged lotto results.
   */
  private _subscribeRangedLottoResults(): void {
    const sub = this.lottoService
      .subscribeRangedResults(res => {
        this._results = res;
      });

    this.subscriptionService.store('_subscribeRangedLottoResults', sub);
  }

  /**
   * Create the map to check the selected state of each number.
   */
  private _createSelectedNumbersMap(): void {
    this.selectedNumbersMap = {};

    this.numbers.forEach(item => this.selectedNumbersMap[item] = false);
  }

  /**
   * Toggle the selected state of number.
   * @param num Number to toggle.
   */
  private _toggleSelectedNumber(num: number): void {
    const index = this.selectedNumbers.indexOf(num);

    if (index !== -1) {
      // When index is not `-1`, remove number from the array and
      // set map data to `false`.
      this.selectedNumbers.splice(index, 1);
      this.selectedNumbersMap[num] = false;
    } else {
      // When index is `-1` and the array length is under `6`,
      // push number to array and set map data to `true`.
      if (this.selectedNumbers.length < 6) {
        this.selectedNumbers.push(num);
        this.selectedNumbersMap[num] = true;
      }
    }

    // If all numbers are selected, update the last selected numbers.
    if (this.selectedNumbers.length === 6) {
      this.lottoService.lastSelectedNumbers = this.selectedNumbers;
    }

    this._updateSelectedNumbers();
  }

  /**
   * Update the selected numbers to lotto service.
   */
  private _updateSelectedNumbers(): void {
    this.lottoService.selectedNumbers = this.selectedNumbers;
  }
}
