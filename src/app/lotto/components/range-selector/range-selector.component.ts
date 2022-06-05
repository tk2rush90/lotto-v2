import {Component, OnInit, Optional, Self} from '@angular/core';
import {LottoHistoryService} from '@lotto/services/app/lotto-history.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {OptionItem} from '@tk-ui/models/option-item';
import {CustomFormControl} from '@tk-ui/bases/custom-form-control/custom-form-control.directive';
import {NgControl} from '@angular/forms';
import {ParsingUtil} from '@tk-ui/utils/parsing.util';

/**
 * The round value.
 */
export interface RoundValue {
  /**
   * Starting round.
   */
  start: number;

  /**
   * Ending round.
   */
  end: number;
}

/**
 * The round range selector.
 */
@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class RangeSelectorComponent extends CustomFormControl<RoundValue> implements OnInit {
  /**
   * Start value.
   * The search selector only can accept string value.
   * It should be parsed before emitted.
   */
  start = '';

  /**
   * End value.
   * The search selector only can accept string value.
   * It should be parsed before emitted.
   */
  end = '';

  /**
   * The options for starting round selector.
   */
  startingRoundOptions: OptionItem<string>[] = [];

  /**
   * The options for ending round selector.
   */
  endingRoundOptions: OptionItem<string>[] = [];

  /**
   * The total round options.
   */
  private _roundOptions: OptionItem<string>[] = [];

  constructor(
    @Self() @Optional() public override ngControl: NgControl,
    private lottoHistoryService: LottoHistoryService,
    private subscriptionService: SubscriptionService,
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this._subscribeRoundOptions();
  }

  /**
   * Update the start round value.
   * @param start - The new start value.
   */
  updateStartValue(start: string): void {
    this.setValue({
      start: ParsingUtil.toInteger(start),
      end: ParsingUtil.toInteger(this.end),
    });
  }

  /**
   * Update the end round value.
   * @param end - The new round value.
   */
  updateEndValue(end: string): void {
    this.setValue({
      start: ParsingUtil.toInteger(this.start),
      end: ParsingUtil.toInteger(end),
    });
  }

  /**
   * Write round value.
   * @param value - The value.
   */
  override writeValue(value: RoundValue) {
    this.start = value?.start.toString() || '';
    this.end = value?.end.toString() || '';
    this._filterOptions();
  }

  /**
   * Subscribe available round options from `LottoHistoryService`.
   */
  private _subscribeRoundOptions(): void {
    const sub = this.lottoHistoryService
      .roundOptions$
      .subscribe(options => {
        this._roundOptions = options;
        this._filterOptions();
      });

    this.subscriptionService.store('_subscribeRoundOptions', sub);
  }

  /**
   * Filter the options according to value.
   */
  private _filterOptions(): void {
    this.startingRoundOptions = this._roundOptions.filter(option => {
      return ParsingUtil.toInteger(option.value) < ParsingUtil.toInteger(this.end);
    });

    this.endingRoundOptions = this._roundOptions.filter(option => {
      return ParsingUtil.toInteger(option.value) > ParsingUtil.toInteger(this.start);
    });
  }
}
