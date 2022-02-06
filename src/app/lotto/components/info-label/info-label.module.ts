import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoLabelComponent} from './info-label.component';
import {TextModule} from '@lotto/components/text/text.module';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {InfoContentDirective} from './info-content.directive';


@NgModule({
  declarations: [
    InfoLabelComponent,
    InfoContentDirective
  ],
  exports: [
    InfoLabelComponent,
    InfoContentDirective
  ],
  imports: [
    CommonModule,
    TextModule,
    IconModule,
  ]
})
export class InfoLabelModule {
}
