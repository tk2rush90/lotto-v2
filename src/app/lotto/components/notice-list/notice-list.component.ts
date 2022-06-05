import {Component, Inject} from '@angular/core';
import {Modal} from '@tk-ui/components/modal/modal/modal.component';
import {ModalProviders, ModalRef, ModalService} from '@tk-ui/components/modal/modal.service';
import {Notice} from '@lotto/models/notice';
import {
  NoticeDetailComponent,
  NoticeDetailData
} from '@lotto/components/notice-list/notice-detail/notice-detail.component';

/**
 * The data of `NoticeList` modal.
 */
export interface NoticeListData {
  /**
   * Notices to display as a list.
   */
  notices: Notice[];
}

/**
 * The modal to display notice list.
 */
@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent extends Modal {

  constructor(
    @Inject(ModalProviders.ref) private modalRef: ModalRef<NoticeListComponent, NoticeListData>,
    @Inject(ModalProviders.data) private data: NoticeListData,
    private modalService: ModalService,
  ) {
    super();
  }

  /**
   * Get notices.
   */
  get notices(): Notice[] {
    return this.data.notices;
  }

  /**
   * Close the modal.
   */
  close(): void {
    this.modalRef.close();
  }

  /**
   * Open notice detail.
   * @param notice - Notice.
   */
  openNotice(notice: Notice): void {
    this.modalService.open<NoticeDetailComponent, NoticeDetailData>({
      component: NoticeDetailComponent,
      data: {
        notice,
      },
    });
  }
}
