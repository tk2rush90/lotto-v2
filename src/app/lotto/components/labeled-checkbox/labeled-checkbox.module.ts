import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LabeledCheckboxComponent} from './labeled-checkbox.component';
import {CheckboxModule} from '@tk-ui/components/checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';
import {TextModule} from '@lotto/components/text/text.module';


@NgModule({
  declarations: [
    LabeledCheckboxComponent
  ],
  exports: [
    LabeledCheckboxComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule,
    TextModule
  ]
})
export class LabeledCheckboxModule {
}
