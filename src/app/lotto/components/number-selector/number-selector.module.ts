import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumberSelectorComponent} from './number-selector.component';
import {RippleModule} from '@tk-ui/components/ripple/ripple.module';


@NgModule({
  declarations: [
    NumberSelectorComponent
  ],
  exports: [
    NumberSelectorComponent
  ],
  imports: [
    CommonModule,
    RippleModule
  ]
})
export class NumberSelectorModule { }
