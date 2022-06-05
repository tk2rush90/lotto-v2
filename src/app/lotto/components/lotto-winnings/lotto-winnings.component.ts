import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {Modal} from '@tk-ui/components/modal/modal/modal.component';
import {ModalProviders} from '@tk-ui/components/modal/modal.service';
import {LottoHistoryService} from '@lotto/services/app/lotto-history.service';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {LottoResult} from '@lotto/models/lotto-result';
import {ObjectMap} from '@tk-ui/others/types';
import {ObjectUtil} from '@tk-ui/utils/object.util';

/**
 * The data for `LottoWinnings` modal.
 */
export interface LottoWinningsData {
  selectedNumbers: number[];
}

/**
 * The modal to display winning details for selected numbers.
 */
@Component({
  selector: 'app-lotto-winnings',
  templateUrl: './lotto-winnings.component.html',
  styleUrls: ['./lotto-winnings.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class LottoWinningsComponent extends Modal implements OnInit {
  /**
   * The page number of results.
   */
  page = -1;

  /**
   * The size to display in a page.
   */
  size = 20;

  /**
   * Selected numbers map.
   */
  selectedNumbersMap: ObjectMap<boolean> = {};

  /**
   * Displaying results.
   */
  displayingResults: LottoResult[] = [];

  /**
   * The lotto results.
   */
  private _results: LottoResult[] = [];

  constructor(
    @Inject(ModalProviders.data) private data: LottoWinningsData,
    private elementRef: ElementRef<HTMLElement>,
    private lottoHistoryService: LottoHistoryService,
    private subscriptionService: SubscriptionService,
  ) {
    super();
  }

  /**
   * Get host element.
   */
  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Get state of whether scroll meets the bottom or not.
   */
  get isScrollEnd(): boolean {
    return this.element.offsetHeight + this.element.scrollTop >= this.element.scrollHeight;
  }

  ngOnInit(): void {
    this.selectedNumbersMap = ObjectUtil.getUniqueKeys(this.data.selectedNumbers);
    this._subscribeLottoResults();
  }

  /**
   * Bind `scroll` event listener to detect scroll end.
   */
  @HostListener('scroll')
  onHostScroll(): void {
    if (this.isScrollEnd) {
      this._getNextPage();
    }
  }

  /**
   * TrackBy function for each round.
   * @param index - The index.
   */
  roundTrackBy(index: number): number {
    return index;
  }

  /**
   * Subscribe lotto results.
   */
  private _subscribeLottoResults(): void {
    const sub = this.lottoHistoryService
      .results$
      .subscribe(results => {
        this._results = results;
        this._getNextPage();
      });

    this.subscriptionService.store('_subscribeLottoResults', sub);
  }

  /**
   * Get next page of results.
   */
  private _getNextPage(): void {
    this.page += 1;
    this.displayingResults.push(...this._results.slice(this.page * this.size, (this.page + 1) * this.size));
  }
}
