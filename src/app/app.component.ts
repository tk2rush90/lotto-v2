import {Component} from '@angular/core';
import {LottoApiService} from '@lotto/services/api/lotto-api.service';
import {LottoService} from '@lotto/services/common/lotto.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AppComponent {
  title = 'lotto-v2';

  // Initializing state.
  loading = false;

  constructor(
    private lottoService: LottoService,
    private lottoApiService: LottoApiService,
    private subscriptionService: SubscriptionService,
  ) {
    this._initialize();
  }

  /**
   * Initialize the application.
   * Get lotto results from the backend to set in memory.
   */
  private _initialize(): void {
    const sub = this.lottoApiService
      .getLottoResults()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: res => {
          this.lottoService.results = res;
        },
        error: err => {
          console.error(err);
        },
      });

    this.subscriptionService.store('_initialize', sub);
    this.loading = true;
  }

}
