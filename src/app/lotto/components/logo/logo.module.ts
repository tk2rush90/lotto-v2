import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './logo.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';


@NgModule({
  declarations: [
    LogoComponent
  ],
  exports: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ]
})
export class LogoModule { }
