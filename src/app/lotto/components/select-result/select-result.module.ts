import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectResultComponent} from './select-result.component';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {LottoBallModule} from '@lotto/components/lotto-ball/lotto-ball.module';
import {LottoWinningsModule} from '@lotto/components/lotto-winnings/lotto-winnings.module';


@NgModule({
  declarations: [
    SelectResultComponent
  ],
  exports: [
    SelectResultComponent
  ],
  imports: [
    CommonModule,
    SectionHeaderModule,
    LottoBallModule,
    LottoWinningsModule,
  ]
})
export class SelectResultModule { }
