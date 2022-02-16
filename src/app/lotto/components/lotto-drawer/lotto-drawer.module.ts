import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LottoDrawerComponent} from './lotto-drawer.component';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {LottoFormComponent} from './lotto-form/lotto-form.component';
import {FlatButtonModule} from '@tk-ui/components/flat-button/flat-button.module';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {LottoNumberComponent} from './lotto-number/lotto-number.component';
import {LabeledCheckboxModule} from '@lotto/components/labeled-checkbox/labeled-checkbox.module';
import {InfoLabelModule} from '@lotto/components/info-label/info-label.module';
import {TextModule} from '@lotto/components/text/text.module';
import {LottoRangeComponent} from './lotto-range/lotto-range.component';
import {SelectModule} from '@tk-ui/components/select/select.module';
import {FormsModule} from '@angular/forms';
import {InlineButtonModule} from '@tk-ui/components/inline-button/inline-button.module';
import {SubHeaderModule} from '@lotto/components/sub-header/sub-header.module';


@NgModule({
  declarations: [
    LottoDrawerComponent,
    LottoFormComponent,
    LottoNumberComponent,
    LottoRangeComponent
  ],
  exports: [
    LottoDrawerComponent
  ],
  imports: [
    CommonModule,
    SectionHeaderModule,
    FlatButtonModule,
    IconModule,
    LabeledCheckboxModule,
    InfoLabelModule,
    TextModule,
    SelectModule,
    FormsModule,
    InlineButtonModule,
    SubHeaderModule,
  ]
})
export class LottoDrawerModule {
}
