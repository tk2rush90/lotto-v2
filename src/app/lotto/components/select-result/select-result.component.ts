import {Component, HostBinding, Input} from '@angular/core';
import {SHOW_UP_ANIMATION_NAME, showUpAnimation, ShowUpState} from '@tk-ui/animations/show-up';
import {SortUtil} from '@tk-ui/utils/sort.util';
import {LottoHistoryService, LottoWinnings} from '@lotto/services/app/lotto-history.service';
import {LottoBall, LottoUtil} from '@lotto/utils/lotto.util';
import {ModalService} from '@tk-ui/components/modal/modal.service';
import {LottoWinningsComponent, LottoWinningsData} from '@lotto/components/lotto-winnings/lotto-winnings.component';

/**
 * The component to display selected numbers as balls and display result statistics.
 */
@Component({
  selector: 'app-select-result',
  templateUrl: './select-result.component.html',
  styleUrls: ['./select-result.component.scss'],
  animations: [
    showUpAnimation,
  ],
})
export class SelectResultComponent {
  /**
   * This is value for auto select with flag of getting until first prize.
   */
  @Input() repeatCount = 0;

  /**
   * Bind `show-up` animation.
   */
  @HostBinding(`@${SHOW_UP_ANIMATION_NAME}`) showUpState = ShowUpState.show;

  /**
   * Winning counts from first to fifth.
   */
  winnings: LottoWinnings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  /**
   * An array of `LottoBall` interface to display balls.
   */
  selectedBalls: LottoBall[] = [];

  /**
   * The original values of selected numbers.
   */
  private _selectedNumbers: number[] = [];

  constructor(
    private modalService: ModalService,
    private lottoHistoryService: LottoHistoryService,
  ) {
  }

  /**
   * Set selected numbers.
   * Create `SelectedBall` interfaces.
   * @param numbers - The selected numbers.
   */
  @Input()
  set selectedNumbers(numbers: number[]) {
    const sortFunction = SortUtil.sortMethodWithOrder('asc');

    // Order numbers by ascending.
    this._selectedNumbers = numbers.sort(sortFunction);
    this.selectedBalls = LottoUtil.createBalls(this._selectedNumbers);

    // After setting numbers, count winnings.
    this._countWinnings();
  }

  /**
   * Open LottoWinnings modal to display details.
   */
  openWinningDetails(): void {
    this.modalService.open<LottoWinningsComponent, LottoWinningsData>({
      component: LottoWinningsComponent,
      data: {
        selectedNumbers: this._selectedNumbers,
      },
    });
  }

  /**
   * Count winnings with selected numbers.
   */
  private _countWinnings(): void {
    this.winnings = this.lottoHistoryService.countWinnings(this._selectedNumbers);
  }
}
