import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NoticeApiService} from '@lotto/services/api/notice-api.service';
import {Notice} from '@lotto/models/notice';
import {MessageService} from '@tk-ui/components/message/message.service';
import {LottoApiService} from '@lotto/services/api/lotto-api.service';
import {LottoHistoryService} from '@lotto/services/app/lotto-history.service';
import {ModalRef, ModalService} from '@tk-ui/components/modal/modal.service';
import {
  ApplicationLoadingComponent,
  ApplicationLoadingData
} from '@lotto/components/application-loading/application-loading.component';
import {finalize} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {NoticeListComponent, NoticeListData} from '@lotto/components/notice-list/notice-list.component';
import {LoggerUtil} from '@tk-ui/utils/logger.util';
import {PlatformService} from '@tk-ui/services/universal/platform.service';
import {SeoService} from '@tk-ui/services/common/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Total notices.
   */
  notices: Notice[] = [];

  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  /**
   * The array of `ModalRef` for `ApplicationLoadingComponent`.
   * Since the `ModalService` creates multiple modals when there are multiple outlets,
   * the returning value after opening modal is an array.
   */
  private _applicationLoadingModalRefs: ModalRef<ApplicationLoadingComponent, ApplicationLoadingData>[] = [];

  constructor(
    private seoService: SeoService,
    private platformService: PlatformService,
    private modalService: ModalService,
    private messageService: MessageService,
    private lottoApiService: LottoApiService,
    private noticeApiService: NoticeApiService,
    private lottoHistoryService: LottoHistoryService,
  ) {
    this._logger.debug('App created');
  }

  ngOnInit(): void {
    this.seoService.update({
      title: '동행복권 로또번호추첨기',
      description: '수동추첨/자동추첨/통계 기능을 이용해 1등 번호를 추첨하세요',
      canonical: '/',
      keywords: [
        '로또',
        '로또번호추첨기',
        '로또추첨',
      ],
    });
  }

  ngAfterViewInit(): void {
    if (this.platformService.isBrowser) {
      this._openApplicationLoading();
      this._getNotices();
      this._getResults();
    }
  }

  /**
   * Open notice list modal.
   */
  openNoticeList(): void {
    this.modalService.open<NoticeListComponent, NoticeListData>({
      component: NoticeListComponent,
      data: {
        notices: this.notices,
      },
    });
  }

  /**
   * Get all notices.
   */
  private _getNotices(): void {
    this._logger.debug('Get notices');

    this.noticeApiService
      .getNotices()
      .subscribe({
        next: notices => {
          this.notices = notices;
          this._logger.debug('Notices', notices);
        },
        error: err => {
          this.messageService.error('공지사항을 가져오지 못했습니다.', err);
        },
      });
  }

  /**
   * Get all lotto results.
   */
  private _getResults(): void {
    this._logger.debug('Get lotto results');

    this.lottoApiService
      .getResults()
      .pipe(finalize(() => {
        this._closeApplicationLoading();
      }))
      .subscribe({
        next: results => {
          this.lottoHistoryService.results = results;
          this._logger.debug('Results', results);
        },
        error: (err: HttpErrorResponse) => {
          this.messageService.error('로또 기록을 가져오지 못했습니다.', err.message);
        },
      });
  }

  /**
   * Open the application loading modal.
   */
  private _openApplicationLoading(): void {
    this._logger.debug('Open loading');

    this._applicationLoadingModalRefs = this.modalService.open<ApplicationLoadingComponent, ApplicationLoadingData>({
      component: ApplicationLoadingComponent,
      data: {
        message: '데이터를 불러오는 중입니다',
      },
      preventClosing: true,
    });
  }

  /**
   * Close the application loading modal.
   */
  private _closeApplicationLoading(): void {
    this._applicationLoadingModalRefs.forEach(modalRef => modalRef.close());
  }
}
