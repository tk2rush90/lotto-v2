import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {WinningResult} from '@lotto/models/winning-result';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {MODAL_REF, ModalRef} from '@tk-ui/components/modal/models/modal-ref';

@Component({
  selector: 'app-winning-statistics-detail',
  templateUrl: './winning-statistics-detail.component.html',
  styleUrls: ['./winning-statistics-detail.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class WinningStatisticsDetailComponent implements OnInit, OnDestroy {
  // Detailed winning results.
  results: WinningResult[] = [];

  // Rendering timers.
  private _timers: any[] = [];

  constructor(
    @Inject(MODAL_REF) private modalRef: ModalRef<WinningStatisticsDetailComponent>,
    private lottoService: LottoService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  ngOnInit(): void {
    this._subscribeResultsAndSelectedNumbers();
  }

  ngOnDestroy(): void {
    // Clear all the timeouts.
    this._timers.forEach(item => clearTimeout(item));
  }

  /**
   * Close the modal.
   */
  close(): void {
    this.modalRef.close();
  }

  /**
   * Subscribe the lotto results and numbers.
   */
  private _subscribeResultsAndSelectedNumbers(): void {
    const sub = this.lottoService
      .subscribeResultsAndSelectedNumbers(({results, numbers}) => {
        const _results = LottoUtil.getDetailedWinningResults(results, numbers);

        // Use timeout to prevent delay of opening modal.
        this._timers = _results.map((item, index) => {
          return setTimeout(() => this.results.push(item), index);
        });
      });

    this.subscriptionService.store('_subscribeResultsAndSelectedNumbers', sub);
  }
}
