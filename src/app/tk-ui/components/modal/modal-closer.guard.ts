import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ModalService} from '@tk-ui/components/modal/modal.service';
import {LoggerUtil} from '@tk-ui/utils/logger.util';

/**
 * This guard can be provided to the router.
 * It will prevent page move when modal is opened in the router.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalCloserGuard implements CanDeactivate<unknown> {
  /**
   * Closer logger.
   */
  private _logger = LoggerUtil.createLogger(this);

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {
  }

  /**
   * If there are some opened modal when trying to deactivate the router,
   * close latest modal first and prevent routing.
   * @param component - The current component.
   * @param currentRoute - The current `ActivatedRouteSnapshot`.
   * @param currentState - The current `RouterStateSnapshot`.
   * @param nextState - The next `RouterStateSnapshot`.
   */
  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasOpenedModal = this.modalService.hasOpenedModal;

    this._logger.debug('hasOpenedModal', hasOpenedModal);
    this._logger.debug('currentState.url', currentState.url);

    if (hasOpenedModal) {
      this.modalService.closeLatest();
      this.router.navigateByUrl(currentState.url);
    }

    return !hasOpenedModal;
  }
}
