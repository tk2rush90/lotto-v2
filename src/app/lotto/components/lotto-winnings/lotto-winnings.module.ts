import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LottoWinningsComponent} from './lotto-winnings.component';
import {LottoWinningComponent} from './lotto-winning/lotto-winning.component';
import {LottoBallModule} from '@lotto/components/lotto-ball/lotto-ball.module';
import {IconModule} from '@tk-ui/components/icon/icon.module';


@NgModule({
  declarations: [
    LottoWinningsComponent,
    LottoWinningComponent
  ],
  imports: [
    CommonModule,
    LottoBallModule,
    IconModule
  ]
})
export class LottoWinningsModule { }
