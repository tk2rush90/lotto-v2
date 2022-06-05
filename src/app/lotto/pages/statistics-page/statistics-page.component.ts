import {Component, OnInit} from '@angular/core';
import {RoundValue} from '@lotto/components/range-selector/range-selector.component';
import {combineLatest} from 'rxjs';
import {LottoHistoryService} from '@lotto/services/app/lotto-history.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {LottoOccurrenceResult, LottoUtil} from '@lotto/utils/lotto.util';
import {LoggerUtil} from '@tk-ui/utils/logger.util';
import {SeoService} from '@tk-ui/services/common/seo.service';

/**
 * The statistics page.
 * User can see statistics for each number.
 */
@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class StatisticsPageComponent implements OnInit {
  /**
   * Round range value.
   */
  range: RoundValue = {
    start: 0,
    end: 0,
  };

  /**
   * State of including bonus number in count.
   */
  includeBonus = false;

  /**
   * Occurrence result to display statistics.
   */
  occurrenceResult?: LottoOccurrenceResult;

  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  constructor(
    private seoService: SeoService,
    private lottoHistoryService: LottoHistoryService,
    private subscriptionService: SubscriptionService,
  ) {
    this._logger.debug('Page created');
  }

  ngOnInit(): void {
    this.seoService.update({
      canonical: '/statistics/',
    });
    this._subscribeRounds();
  }

  /**
   * Handle round range changes.
   * @param range - The changed round value.
   */
  onRangeChange(range: RoundValue): void {
    this.range = range;
    this._getRangedStatistics();
  }

  /**
   * Handle include bonus changes.
   * @param state - The changed include bonus state.
   */
  onIncludeBonusChange(state: boolean): void {
    this.includeBonus = state;
    this._getRangedStatistics();
  }

  /**
   * Subscribe the oldest/latest rounds.
   */
  private _subscribeRounds(): void {
    const sub = combineLatest([
      this.lottoHistoryService.oldestRound$,
      this.lottoHistoryService.latestRound$,
    ]).subscribe(([latest, oldest]) => {
      this.onRangeChange({
        start: oldest,
        end: latest,
      });
    });

    this.subscriptionService.store('_subscribeRounds', sub);
  }

  /**
   * Get ranged statistics.
   */
  private _getRangedStatistics(): void {
    const sub = this.lottoHistoryService
      .getRangedResults(this.range.start, this.range.end)
      .subscribe(results => {
        this.occurrenceResult = LottoUtil.getOccurrenceCounts(results, this.includeBonus);
      });

    this.subscriptionService.store('_getRangedStatistics', sub);
  }
}
