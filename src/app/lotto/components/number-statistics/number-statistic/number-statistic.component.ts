import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * The data of number statistic.
 */
export interface NumberStatistic {
  /**
   * The number.
   */
  number: number;

  /**
   * The occurred count.
   */
  occurrence: number;

  /**
   * The occurrence rate.
   */
  occurRate: number;
}

/**
 * The component to display bar chart for a number statistic.
 */
@Component({
  selector: 'app-number-statistic',
  templateUrl: './number-statistic.component.html',
  styleUrls: ['./number-statistic.component.scss'],
  animations: [
    trigger('scaling', [
      state('void', style({
        width: '0',
      })),
      state('grow', style({
        width: '{{width}}%'
      }), {
        params: {
          width: 0,
        },
      }),
      transition('* <=> *', animate('.3s')),
    ]),
  ],
})
export class NumberStatisticComponent {
  /**
   * Scaling animation state.
   */
  scalingState = {
    value: 'void',
    params: {
      width: 0,
    },
  };

  /**
   * The number statistic data.
   */
  private _data!: NumberStatistic;

  /**
   * Set number statistic data.
   * @param data - The data.
   */
  @Input()
  set data(data: NumberStatistic) {
    this._data = data;
    this.scalingState = {
      value: 'grow',
      params: {
        width: this._data.occurRate,
      },
    };
  }

  /**
   * Get number.
   */
  get number(): number {
    return this._data.number;
  }

  /**
   * Get occurrence count.
   */
  get occurrence(): number {
    return this._data.occurrence;
  }
}
