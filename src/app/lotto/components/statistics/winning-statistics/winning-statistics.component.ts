import {Component, OnInit} from '@angular/core';
import {LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {LottoResult} from '@lotto/models/lotto-result';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {ModalService} from '@tk-ui/components/modal/services/modal.service';
import {
  WinningStatisticsDetailComponent
} from '@lotto/components/statistics/winning-statistics-detail/winning-statistics-detail.component';

@Component({
  selector: 'app-winning-statistics',
  templateUrl: './winning-statistics.component.html',
  styleUrls: ['./winning-statistics.component.scss'],
  providers: [
    SubscriptionService,
  ]
})
export class WinningStatisticsComponent implements OnInit {
  // Winning results.
  winnings: number[] = [];

  // Historical winning results.
  private _results: LottoResult[] = [];

  // Only the 6 numbers are allowed.
  private _selectedNumbers: number[] = [];

  constructor(
    private lottoService: LottoService,
    private modalService: ModalService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  /**
   * Get the state of all numbers selected.
   */
  get allNumbersSelected(): boolean {
    return this._selectedNumbers.length === 6;
  }

  ngOnInit(): void {
    this._subscribeLottoResults();
    this._subscribeSelectedNumbers();
  }

  /**
   * Open the details modal.
   */
  openDetails(): void {
    this.modalService.open(WinningStatisticsDetailComponent, {
      closeOnNavigating: true,
    });
  }

  /**
   * Subscribe the historical results.
   */
  private _subscribeLottoResults(): void {
    const sub = this.lottoService
      .subscribeResults(res => this._results = res);

    this.subscriptionService.store('_subscribeLottoResults', sub);
  }

  /**
   * Subscribe the selected numbers.
   */
  private _subscribeSelectedNumbers(): void {
    const sub = this.lottoService
      .subscribeSelectedNumbers(res => {
        this._selectedNumbers = res;

        if (this.allNumbersSelected) {
          this._getWinningResults();
        }
      });

    this.subscriptionService.store('_subscribeSelectedNumbers', sub);
  }

  /**
   * Get winning result.
   */
  private _getWinningResults(): void {
    this.winnings = LottoUtil.getWinningResults(this._results, this._selectedNumbers);
  }
}
