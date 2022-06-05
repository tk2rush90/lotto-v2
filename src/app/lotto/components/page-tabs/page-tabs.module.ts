import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageTabsComponent} from './page-tabs.component';
import {RouterModule} from '@angular/router';
import {RippleModule} from '@tk-ui/components/ripple/ripple.module';


@NgModule({
  declarations: [
    PageTabsComponent
  ],
  exports: [
    PageTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RippleModule
  ]
})
export class PageTabsModule { }
