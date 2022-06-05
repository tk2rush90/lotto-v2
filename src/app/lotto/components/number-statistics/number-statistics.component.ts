import {Component, Input} from '@angular/core';
import {LottoOccurrenceResult} from '@lotto/utils/lotto.util';
import {NumberStatistic} from '@lotto/components/number-statistics/number-statistic/number-statistic.component';
import {ArrayUtil} from '@tk-ui/utils/array.util';

/**
 * The component to display number statistics.
 */
@Component({
  selector: 'app-number-statistics',
  templateUrl: './number-statistics.component.html',
  styleUrls: ['./number-statistics.component.scss']
})
export class NumberStatisticsComponent {
  /**
   * Number statistics.
   */
  statistics: NumberStatistic[] = [];

  /**
   * Occurrence data.
   */
  private _data: LottoOccurrenceResult = {
    total: 0,
    occurrences: [],
  };

  /**
   * Set occurrence data.
   */
  @Input() set data(data: LottoOccurrenceResult | undefined) {
    if (data) {
      const max = ArrayUtil.max(data.occurrences.map(count => count));

      this._data = data;
      this.statistics = this._data.occurrences.map((count, index) => {
        return {
          number: index + 1,
          occurRate: count / max * 100,
          occurrence: count,
        };
      });
    }
  }

  /**
   * TrackBy function for statistics.
   * @param index - The index.
   */
  statisticTrackBy(index: number): number {
    return index;
  }
}
