import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoundValue} from '@lotto/components/range-selector/range-selector.component';
import {LottoHistoryService} from '@lotto/services/app/lotto-history.service';
import {combineLatest} from 'rxjs';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {RandomStrategyValue} from '@lotto/components/random-options/random-options.component';
import {LottoResult} from '@lotto/models/lotto-result';
import {LottoUtil} from '@lotto/utils/lotto.util';
import {ModalRef, ModalService} from '@tk-ui/components/modal/modal.service';
import {
  ApplicationLoadingComponent,
  ApplicationLoadingData
} from '@lotto/components/application-loading/application-loading.component';
import {LoggerUtil} from '@tk-ui/utils/logger.util';
import {SeoService} from '@tk-ui/services/common/seo.service';

/**
 * The auto selecting page.
 * User can get programmatically selected numbers.
 */
@Component({
  selector: 'app-auto-page',
  templateUrl: './auto-page.component.html',
  styleUrls: ['./auto-page.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AutoPageComponent implements OnInit, OnDestroy {
  /**
   * The random strategy value.
   */
  random: RandomStrategyValue = 'random';

  /**
   * The round range value.
   */
  range: RoundValue = {
    start: 0,
    end: 0,
  };

  /**
   * Flag of whether select numbers until get first prize or not.
   */
  selectUntilFirstPrize = false;

  /**
   * Flat of whether using bonus number or not when calculating.
   */
  includeBonus = false;

  /**
   * Selected numbers.
   */
  selectedNumbers: number[] = [];

  /**
   * Repeat count until get first prize number.
   */
  repeatCount = 0;

  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  /**
   * Ranged results between starting round and ending round.
   */
  private _rangedResults: LottoResult[] = [];

  /**
   * State to force stop repeating of selecting numbers.
   */
  private _forceStopRepeating = false;

  /**
   * `ModalRef` list of `ApplicationLoadingComponent`.
   */
  private _applicationLoadingModalRefs: ModalRef<ApplicationLoadingComponent, ApplicationLoadingData>[] = [];

  /**
   * The repeat timer for Timeout.
   */
  private _repeatTimer: any;

  /**
   * The limit count for a single cycle to select first prize numbers.
   */
  private readonly _selectCycleLimit = 50;

  constructor(
    private seoService: SeoService,
    private modalService: ModalService,
    private lottoHistoryService: LottoHistoryService,
    private subscriptionService: SubscriptionService,
  ) {
    this._logger.debug('Page created');
  }

  /**
   * Get state of having selected numbers.
   */
  get hasSelectedNumbers(): boolean {
    return this.selectedNumbers.length === 6;
  }

  ngOnInit(): void {
    this.seoService.update({
      canonical: '/auto/',
    });
    this._subscribeRounds();
  }

  ngOnDestroy(): void {
    this._forceStopRepeating = true;
    clearTimeout(this._repeatTimer);
  }

  /**
   * Handle round range changes.
   * @param range - The changed round value.
   */
  onRangeChange(range: RoundValue): void {
    this.range = range;
    this._getRangedResults();
  }

  /**
   * Start selecting numbers.
   */
  selectNumbers(): void {
    this.repeatCount = 0;
    this.selectedNumbers = [];
    this._forceStopRepeating = false;

    if (this.selectUntilFirstPrize) {
      this._openApplicationLoading();
      this._selectNumbersUntilGetFirstPrize();
    } else {
      this._selectNumbersOnce();
    }
  }

  /**
   * Open application loading.
   */
  private _openApplicationLoading(): void {
    this._applicationLoadingModalRefs = this.modalService.open<ApplicationLoadingComponent, ApplicationLoadingData>({
      component: ApplicationLoadingComponent,
      data: {
        message: '번호를 추출 중입니다',
      },
      preventClosing: true,
      onClose: () => {
        // Modal can be closed when user try to move to previous page.
        // So, when modal closed, set `_forceStopRepeating` to `true` to stop repeating.
        this._forceStopRepeating = true;
      },
    });
  }

  /**
   * Close application loading.
   */
  private _closeApplicationLoading(): void {
    this._applicationLoadingModalRefs.forEach(modalRef => modalRef.close());
  }

  /**
   * Select numbers until get first prize.
   */
  private _selectNumbersUntilGetFirstPrize(): void {
    this._selectNumbersWithCycle()
      .then(selectedNumbers => {
        // When there are no result from `_selectNumbersWithCycle()`,
        // repeat `_selectNumbersUntilGetFirstPrize()`.
        if (selectedNumbers.length === 0) {
          clearTimeout(this._repeatTimer);

          // Use set timeout to prevent performance issue.
          this._repeatTimer = setTimeout(() => {
            this._selectNumbersUntilGetFirstPrize();
          });
        } else {
          this.selectedNumbers = selectedNumbers;
          this._closeApplicationLoading();
        }
      })
      .catch(err => {
        this._logger.warn( `'_selectNumbersWithCycle()' has failed:`, err);
      });
  }

  /**
   * Select numbers for `_selectCycleLimit` cycle until get first prize.
   */
  private _selectNumbersWithCycle(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      let win = false;
      let count = 0;
      let selectedNumbers: number[] = [];

      // Repeat selecting until get first prize.
      // But, run code `_selectCycleLimit` cycle at once to prevent performance issue.
      while (count < this._selectCycleLimit) {
        switch (this.random) {
          case 'random': {
            selectedNumbers = LottoUtil.getRandomNumbers();
            break;
          }

          case 'most-weighted': {
            selectedNumbers = LottoUtil.getMostWeightedNumbers(this._rangedResults, this.includeBonus);
            break;
          }

          case 'least-weighted': {
            selectedNumbers = LottoUtil.getLeastWeightedNumbers(this._rangedResults, this.includeBonus);
            break;
          }
        }

        const winnings = this.lottoHistoryService.countWinnings(selectedNumbers);

        win = winnings[1] > 0;

        // Break when the number is first prize or `_forceStopRepeating` is `true`.
        if (win || this._forceStopRepeating) {
          break;
        }

        count++;
      }

      // Increase repeat count.
      this.repeatCount += count;

      // When get winning numbers, resolve with `selectedNumbers`.
      // If not, resolve with empty array.
      if (win) {
        resolve(selectedNumbers);
      } else if (this._forceStopRepeating) {
        reject('Forced to stop');
      } else {
        resolve([]);
      }
    });
  }

  /**
   * Select the numbers just once.
   */
  private _selectNumbersOnce(): void {
    switch (this.random) {
      case 'random': {
        this.selectedNumbers = LottoUtil.getRandomNumbers();
        break;
      }

      case 'most-weighted': {
        this.selectedNumbers = LottoUtil.getMostWeightedNumbers(this._rangedResults, this.includeBonus);
        break;
      }

      case 'least-weighted': {
        this.selectedNumbers = LottoUtil.getLeastWeightedNumbers(this._rangedResults, this.includeBonus);
        break;
      }
    }
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
   * Get ranged results with selected range.
   */
  private _getRangedResults(): void {
    const sub = this.lottoHistoryService
      .getRangedResults(this.range.start, this.range.end)
      .subscribe(results => {
        this._rangedResults = results;
      });

    this.subscriptionService.store('_getRangedResults', sub);
  }
}
