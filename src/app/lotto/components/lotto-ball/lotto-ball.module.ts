import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LottoBallComponent} from './lotto-ball.component';


@NgModule({
  declarations: [
    LottoBallComponent
  ],
  exports: [
    LottoBallComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LottoBallModule { }
