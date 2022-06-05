import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsPageComponent} from './statistics-page.component';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {RangeSelectorModule} from '@lotto/components/range-selector/range-selector.module';
import {FormsModule} from '@angular/forms';
import {CheckboxModule} from '@tk-ui/components/checkbox/checkbox.module';
import {RippleModule} from '@tk-ui/components/ripple/ripple.module';
import {NumberStatisticsModule} from '@lotto/components/number-statistics/number-statistics.module';


@NgModule({
  declarations: [
    StatisticsPageComponent
  ],
  imports: [
    CommonModule,
    SectionHeaderModule,
    RangeSelectorModule,
    FormsModule,
    CheckboxModule,
    RippleModule,
    NumberStatisticsModule
  ]
})
export class StatisticsPageModule { }
