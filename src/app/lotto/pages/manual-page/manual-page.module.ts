import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManualPageComponent} from './manual-page.component';
import {NumberSelectorModule} from '@lotto/components/number-selector/number-selector.module';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {SelectResultModule} from '@lotto/components/select-result/select-result.module';


@NgModule({
  declarations: [
    ManualPageComponent
  ],
  imports: [
    CommonModule,
    NumberSelectorModule,
    SectionHeaderModule,
    SelectResultModule
  ]
})
export class ManualPageModule { }
