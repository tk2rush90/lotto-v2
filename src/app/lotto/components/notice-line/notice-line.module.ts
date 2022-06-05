import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoticeLineComponent} from './notice-line.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';


@NgModule({
  declarations: [
    NoticeLineComponent
  ],
  exports: [
    NoticeLineComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class NoticeLineModule { }
