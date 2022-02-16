import {Component, OnInit} from '@angular/core';
import {LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';

@Component({
  selector: 'app-lotto-drawer',
  templateUrl: './lotto-drawer.component.html',
  styleUrls: ['./lotto-drawer.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class LottoDrawerComponent implements OnInit {
  // The last crawled round.
  lastRound = 0;

  constructor(
    private lottoService: LottoService,
    private subscriptionService: SubscriptionService,
  ) {
  }

  ngOnInit(): void {
    this._subscribeLottoResults();
  }

  /**
   * Subscribe the lotto results to get last crawled round.
   */
  private _subscribeLottoResults(): void {
    const sub = this.lottoService
      .subscribeResults(res => {
        if (res.length > 0) {
          this.lastRound = res[0].round;
        }
      });

    this.subscriptionService.store('_subscribeLottoResults', sub);
  }
}
