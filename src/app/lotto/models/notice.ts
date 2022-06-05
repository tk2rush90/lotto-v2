import {DateLike} from '@tk-ui/others/types';

/**
 * Notice item.
 */
export interface Notice {
  /**
   * The title of notice.
   */
  title: string;

  /**
   * The contents of notice.
   */
  contents: string;

  /**
   * The created date of notice.
   */
  noticeDate: DateLike;
}
