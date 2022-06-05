import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RandomOptionsComponent} from './random-options.component';
import {RandomOptionComponent} from './random-option/random-option.component';
import {CheckboxModule} from '@tk-ui/components/checkbox/checkbox.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RandomOptionsComponent,
    RandomOptionComponent
  ],
  exports: [
    RandomOptionsComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    FormsModule
  ]
})
export class RandomOptionsModule { }
