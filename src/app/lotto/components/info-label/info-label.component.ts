import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EventListenerService} from '@tk-ui/services/common/event-listener.service';

@Component({
  selector: 'app-info-label',
  templateUrl: './info-label.component.html',
  styleUrls: ['./info-label.component.scss'],
  providers: [
    EventListenerService,
  ]
})
export class InfoLabelComponent implements OnInit {
  // The label text.
  @Input() label = '';

  // Reference to the question icon element.
  @ViewChild('question', {read: ElementRef}) questionIconElementRef!: ElementRef<HTMLElement>;

  // Info opened state.
  infoOpened = false;

  constructor(
    private eventListenerService: EventListenerService,
  ) {
  }

  // The top position of popup.
  private _popupTop = 0;

  /**
   * Get the top value of popup.
   */
  get popupTop(): string {
    return `${this._popupTop}px`;
  }

  // The left position of popup.
  private _popupLeft = 0;

  /**
   * Get the left value of popup.
   */
  get popupLeft(): string {
    return `${this._popupLeft}px`;
  }

  ngOnInit(): void {
  }

  /**
   * Open the info popup on mouse enter.
   * This only worked for desktop.
   * @param event
   * It can be mouseevent or touchevent and touchevent will be ignored.
   */
  onMouseEnter(event: MouseEvent | TouchEvent): void {
    if ((event as TouchEvent).touches?.length > 0) {
      // Ignore
    } else {
      this._openPopupAndAddEvents();
    }
  }

  /**
   * Close the info popup.
   */
  onMouseLeave(): void {
    this._closePopupAndRemoveEvents();
  }

  /**
   * Toggle the popup opened state on touch started.
   */
  onTouchStart(): void {
    // If the popup is opened now,
    if (this.infoOpened) {
      this._closePopupAndRemoveEvents();
    } else {
      this._openPopupAndAddEvents();
    }
  }

  /**
   * Open the popup and add the scroll detecting event to close the popup on scroll.
   */
  private _openPopupAndAddEvents(): void {
    this.infoOpened = true;
    this._calculateThePopupPosition();

    this.eventListenerService.addEvent(window, 'wheel', this._closePopupAndRemoveEvents);
    this.eventListenerService.addEvent(window, 'scroll', this._closePopupAndRemoveEvents);
  }

  /**
   * Close the popup and remove bound events.
   */
  private _closePopupAndRemoveEvents = (): void => {
    this.infoOpened = false;

    this.eventListenerService.removeEvent(window, 'wheel', this._closePopupAndRemoveEvents);
    this.eventListenerService.removeEvent(window, 'scroll', this._closePopupAndRemoveEvents);
  }

  /**
   * Calculate the popup position when opening.
   */
  private _calculateThePopupPosition(): void {
    const rect = this.questionIconElementRef.nativeElement.getBoundingClientRect();

    this._popupTop = rect.bottom + 5;
    this._popupLeft = rect.left + (rect.width / 2);
  }
}
