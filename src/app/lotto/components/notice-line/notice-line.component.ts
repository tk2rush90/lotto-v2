import {Component, Input} from '@angular/core';
import {Notice} from '@lotto/models/notice';
import {SortUtil} from '@tk-ui/utils/sort.util';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {RippleColor, RippleDirective} from '@tk-ui/components/ripple/ripple.directive';

/**
 * The Notice line to display recent 3 notices by rolling.
 */
@Component({
  selector: 'app-notice-line',
  templateUrl: './notice-line.component.html',
  styleUrls: ['./notice-line.component.scss'],
  animations: [
    trigger('rolling', [
      state('displaying', style({
        transform: 'translateY(0)',
      })),
      state('rolling', style({
        transform: 'translateY(-100%)',
      })),
      transition('displaying => rolling', animate('.5s 1.5s')),
      transition('rolling => displaying', animate('0s')),
    ]),
  ],
})
export class NoticeLineComponent extends RippleDirective {
  /**
   * Rolling state.
   */
  rollingState = 'displaying';

  /**
   * All notices.
   */
  private _notices: Notice[] = [];

  /**
   * Recent 3 notices to rolling.
   */
  private _recentNotices: Notice[] = [];

  /**
   * The index of current notice.
   */
  private _currentNoticeIndex = 0;

  /**
   * The index of next notice.
   */
  private _nextNoticeIndex = 0;

  /**
   * Set notices and extract recent 3 notices.
   * @param notices - All notices.
   */
  @Input()
  set notices(notices: Notice[]) {
    this._notices = notices;
    this._findRecentNotices();
  }

  /**
   * Fix ripple color to `white`.
   */
  override get rippleColor(): RippleColor {
    return 'white';
  }

  /**
   * Get the title of current displaying notice.
   */
  get currentNotice(): string {
    return this._recentNotices[this._currentNoticeIndex]?.title;
  }

  /**
   * Get the title of next displaying notice.
   */
  get nextNotice(): string {
    return this._recentNotices[this._currentNoticeIndex ]?.title;
  }

  /**
   * Get next index.
   */
  get nextIndex(): number {
    let nextIndex = this._currentNoticeIndex + 1;

    // When next index is bigger than `recentNotices.length`, return to first notice.
    if (nextIndex >= this._recentNotices.length) {
      nextIndex = 0;
    }

    return nextIndex;
  }

  /**
   * Update the animation state when done.
   * @param event - The `AnimationEvent`.
   */
  onRollingDone(event: AnimationEvent): void {
    switch (event.toState) {
      case 'displaying': {
        this.rollingState = 'rolling';
        break;
      }

      case 'rolling': {
        this.rollingState = 'displaying';
        this._currentNoticeIndex = this.nextIndex;
        this._nextNoticeIndex = this.nextIndex;
        break;
      }
    }
  }

  /**
   * Find recent notices from `_notices`.
   */
  private _findRecentNotices(): void {
    // Order notices with `noticeDate` by descending.
    const sortFunction = SortUtil.sortMethodWithOrderByColumn<Notice>({
      property: 'noticeDate',
      direction: 'desc',
      type: 'date',
    });

    this._notices.sort(sortFunction);
    this._recentNotices = [...this._notices].splice(0, 3);
    this._currentNoticeIndex = 0;
    this._nextNoticeIndex = this.nextIndex;
  }
}
