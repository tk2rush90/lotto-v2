import {Component, Inject} from '@angular/core';
import {Modal} from '@tk-ui/components/modal/modal/modal.component';
import {ModalProviders} from '@tk-ui/components/modal/modal.service';
import {LoggerUtil} from '@tk-ui/utils/logger.util';

/**
 * The data of `ApplicationLoadingComponent` modal.
 */
export interface ApplicationLoadingData {
  /**
   * Message to display.
   */
  message: string;
}

/**
 * Show application level global loading.
 */
@Component({
  selector: 'app-application-loading',
  templateUrl: './application-loading.component.html',
  styleUrls: ['./application-loading.component.scss'],
})
export class ApplicationLoadingComponent extends Modal {
  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  constructor(
    @Inject(ModalProviders.data) private data: ApplicationLoadingData,
  ) {
    super();

    this._logger.debug('Component created');
  }

  /**
   * Get message.
   */
  get message(): string {
    return this.data.message;
  }
}
