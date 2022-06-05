import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoPageComponent} from './auto-page.component';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {RangeSelectorModule} from '@lotto/components/range-selector/range-selector.module';
import {FormsModule} from '@angular/forms';
import {RandomOptionsModule} from '@lotto/components/random-options/random-options.module';
import {FlatButtonModule} from '@tk-ui/components/flat-button/flat-button.module';
import {CheckboxModule} from '@tk-ui/components/checkbox/checkbox.module';
import {RippleModule} from '@tk-ui/components/ripple/ripple.module';
import {SelectResultModule} from '@lotto/components/select-result/select-result.module';
import {ApplicationLoadingModule} from '@lotto/components/application-loading/application-loading.module';


@NgModule({
  declarations: [
    AutoPageComponent
  ],
  imports: [
    CommonModule,
    SectionHeaderModule,
    RangeSelectorModule,
    FormsModule,
    RandomOptionsModule,
    FlatButtonModule,
    CheckboxModule,
    RippleModule,
    SelectResultModule,
    ApplicationLoadingModule,
  ]
})
export class AutoPageModule { }
