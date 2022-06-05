import {Component, HostBinding, Input} from '@angular/core';
import {LottoResult} from '@lotto/models/lotto-result';
import {ObjectMap} from '@tk-ui/others/types';
import {LottoBall, LottoUtil} from '@lotto/utils/lotto.util';
import {SHOW_UP_ANIMATION_NAME, showUpAnimation, ShowUpState} from '@tk-ui/animations/show-up';

/**
 * Display the number matches for specific round with selected numbers.
 */
@Component({
  selector: 'app-lotto-winning',
  templateUrl: './lotto-winning.component.html',
  styleUrls: ['./lotto-winning.component.scss'],
  animations: [
    showUpAnimation,
  ],
})
export class LottoWinningComponent {
  /**
   * The map of selected numbers.
   */
  @Input() selectedNumbersMap: ObjectMap<boolean> = {};

  /**
   * Bind `show-up` animation state.
   */
  @HostBinding(`@${SHOW_UP_ANIMATION_NAME}`) showUpState = ShowUpState.show;

  /**
   * The balls for winning numbers.
   */
  winningBalls: LottoBall[] = [];

  /**
   * The ball for bonus number.
   */
  bonusBall!: LottoBall;

  /**
   * The lotto result.
   */
  private _result!: LottoResult;

  /**
   * The lotto result.
   */
  @Input()
  set result(result: LottoResult) {
    this._result = result;
    this.winningBalls = LottoUtil.createBalls(this._result.numbers);
    this.bonusBall = LottoUtil.createBalls([this._result.bonus])[0];
  }

  /**
   * Get round number.
   */
  get round(): number {
    return this._result.round;
  }
}
