import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RangeSelectorComponent} from './range-selector.component';
import {SearchSelectModule} from '@tk-ui/components/search-select/search-select.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RangeSelectorComponent
  ],
  exports: [
    RangeSelectorComponent
  ],
  imports: [
    CommonModule,
    SearchSelectModule,
    FormsModule
  ]
})
export class RangeSelectorModule { }
