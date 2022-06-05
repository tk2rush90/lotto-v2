import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoticeListComponent} from './notice-list.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {NoticeDetailComponent} from './notice-detail/notice-detail.component';
import {MarkdownModule} from 'ngx-markdown';


@NgModule({
  declarations: [
    NoticeListComponent,
    NoticeDetailComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    MarkdownModule.forRoot(),
  ]
})
export class NoticeListModule { }
