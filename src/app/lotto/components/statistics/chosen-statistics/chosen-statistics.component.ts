import {Component, OnInit} from '@angular/core';
import {ChosenStatisticsSort, LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {LottoResult} from '@lotto/models/lotto-result';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {OccurrenceStatistic} from '@lotto/models/occurrence-statistic';

@Component({
  selector: 'app-chosen-statistics',
  templateUrl: './chosen-statistics.component.html',
  styleUrls: ['./chosen-statistics.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class ChosenStatisticsComponent implements OnInit {
  // Number occurrence statistics.
  occurrences: OccurrenceStatistic[] = [];

  // Historical lotto results.
  private _results: LottoResult[] = [];

  // Sort field.
  private _sort: ChosenStatisticsSort = this.lottoService.lastSelectedSort;

  constructor(
    private lottoService: LottoService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get the label for sort button.
   */
  get sortButtonLabel(): string {
    switch (this._sort) {
      case 'number': {
        return '번호 순';
      }

      case 'occurrence': {
        return '빈도 순';
      }
    }
  }

  ngOnInit(): void {
    this._subscribeRangedLottoResults();
  }

  /**
   * Toggle the sort type.
   */
  toggleSort(): void {
    switch (this._sort) {
      case 'number': {
        this._sort = 'occurrence';
        break;
      }

      case 'occurrence': {
        this._sort = 'number';
        break;
      }
    }

    this.lottoService.lastSelectedSort = this._sort;
    this._sortOccurrences();
  }

  /**
   * Subscribe the ranged lotto results.
   */
  private _subscribeRangedLottoResults(): void {
    const sub = this.lottoService
      .subscribeRangedResults(res => {
        this._results = res;
        this.occurrences = LottoUtil.getNumberOccurrenceStatistics(this._results);
        this._sortOccurrences();
      });

    this.subscriptionService.store('_subscribeRangedLottoResults', sub);
  }

  /**
   * Sort the occurrences.
   */
  private _sortOccurrences(): void {
    this.occurrences = LottoUtil.sortOccurrenceStatistics(this.occurrences, this._sort);
  }
}
