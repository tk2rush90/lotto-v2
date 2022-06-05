import {AfterViewInit, Component, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {RandomUtil} from '@tk-ui/utils/random.util';
import {ModalService} from '@tk-ui/components/modal/modal.service';
import {LoggerUtil} from '@tk-ui/utils/logger.util';

/**
 * The `ModalOutlet` should be placed in the root component
 * where the modals need to be rendered.
 */
@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
  styleUrls: ['./modal-outlet.component.scss'],
})
export class ModalOutletComponent implements AfterViewInit, OnDestroy {
  /**
   * `ViewContainerRef` for `ng-container`.
   */
  @ViewChild('container', {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef;

  /**
   * Use random key for id.
   */
  id = RandomUtil.key();

  /**
   * Logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  constructor(
    private modalService: ModalService,
  ) {
    this._logger.debug('Modal outlet created');
  }

  ngAfterViewInit(): void {
    this.modalService.registerOutlet(this);
  }

  ngOnDestroy(): void {
    this.modalService.unregisterOutlet(this);
  }
}
