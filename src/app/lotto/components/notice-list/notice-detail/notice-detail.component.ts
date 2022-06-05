import {Component, Inject} from '@angular/core';
import {ModalProviders, ModalRef} from '@tk-ui/components/modal/modal.service';
import {Modal} from '@tk-ui/components/modal/modal/modal.component';
import {Notice} from '@lotto/models/notice';

/**
 * The data of `NoticeDetail` modal.
 */
export interface NoticeDetailData {
  /**
   * Notice to display detail.
   */
  notice: Notice;
}

/**
 * The modal to display notice detail.
 */
@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent extends Modal {

  constructor(
    @Inject(ModalProviders.ref) private modalRef: ModalRef<NoticeDetailComponent>,
    @Inject(ModalProviders.data) private data: NoticeDetailData,
  ) {
    super();
  }

  /**
   * Get notice data.
   */
  get notice(): Notice {
    return this.data.notice;
  }

  /**
   * Close the modal.
   */
  close(): void {
    this.modalRef.close();
  }
}
