import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationLoadingComponent} from './application-loading.component';
import {SpinnerModule} from '@tk-ui/components/spinner/spinner.module';


@NgModule({
  declarations: [
    ApplicationLoadingComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ]
})
export class ApplicationLoadingModule { }
