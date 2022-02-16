import {Component, OnInit} from '@angular/core';
import {LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {OptionItem} from '@tk-ui/models/option-item';
import {LottoResult} from '@lotto/models/lotto-result';

@Component({
  selector: 'app-lotto-range',
  templateUrl: './lotto-range.component.html',
  styleUrls: ['./lotto-range.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class LottoRangeComponent implements OnInit {
  // Values for selects.
  startingRound?: number;
  endingRound?: number;

  // Options for selects.
  startingRoundOptions: OptionItem<number>[] = [];
  endingRoundOptions: OptionItem<number>[] = [];

  constructor(
    private lottoService: LottoService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get the selectable starting options.
   */
  get selectableStartingRoundOptions(): OptionItem<number>[] {
    if (this.endingRound) {
      return this.startingRoundOptions.filter(item => item.value < this.endingRound!);
    } else {
      return this.startingRoundOptions;
    }
  }

  /**
   * Get the selectable ending options.
   */
  get selectableEndingRoundOptions(): OptionItem<number>[] {
    if (this.startingRound) {
      return this.endingRoundOptions.filter(item => item.value > this.startingRound!);
    } else {
      return this.endingRoundOptions;
    }
  }

  ngOnInit(): void {
    this._subscribeLottoResults();
    this._subscribeStartingAndEndingRounds();
  }

  /**
   * Reset the values.
   */
  reset(): void {
    this.lottoService.startingRound = undefined;
    this.lottoService.endingRound = undefined;
  }

  /**
   * Update the service value.
   * @param startingRound Changed starting round.
   */
  onStartingRoundChange(startingRound?: number): void {
    this.lottoService.startingRound = startingRound;
  }

  /**
   * Update the service value.
   * @param endingRound Changed ending round.
   */
  onEndingRoundChange(endingRound?: number): void {
    this.lottoService.endingRound = endingRound;
  }

  /**
   * Subscribe the lotto results to create select options.
   */
  private _subscribeLottoResults(): void {
    const sub = this.lottoService
      .subscribeResults(res => {
        this.startingRoundOptions = this._createStartingOptions(res);
        this.endingRoundOptions = this._createEndingOptions(res);
      });

    this.subscriptionService.store('_subscribeLottoResults', sub);
  }

  /**
   * Subscribe starting and ending rounds.
   */
  private _subscribeStartingAndEndingRounds(): void {
    const sub = this.lottoService
      .subscribeStartingAndEndingRounds((startingRound, endingRound) => {
        this.startingRound = startingRound;
        this.endingRound = endingRound;
      });

    this.subscriptionService.store('_subscribeStartingAndEndingRounds', sub);
  }

  /**
   * Create starting options with lotto results.
   * @param results Results.
   */
  private _createStartingOptions(results: LottoResult[]): OptionItem<number>[] {
    return results
      // Remove the latest round from the list.
      .filter((item, index) => index !== 0)
      .map(item => new OptionItem(`${item.round}회`, item.round));
  }

  /**
   * Create ending options with lotto results.
   * @param results Results.
   */
  private _createEndingOptions(results: LottoResult[]): OptionItem<number>[] {
    return results
      // Remove the round 1 from the list.
      .filter(item => item.round !== 1)
      .map(item => new OptionItem(`${item.round}회`, item.round));
  }
}
