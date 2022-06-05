import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberStatisticsComponent} from './number-statistics.component';
import {NumberStatisticComponent} from './number-statistic/number-statistic.component';


@NgModule({
  declarations: [
    NumberStatisticsComponent,
    NumberStatisticComponent
  ],
  exports: [
    NumberStatisticsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NumberStatisticsModule { }
