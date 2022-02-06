import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubHeaderComponent} from './sub-header.component';


@NgModule({
  declarations: [
    SubHeaderComponent
  ],
  exports: [
    SubHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubHeaderModule {
}
