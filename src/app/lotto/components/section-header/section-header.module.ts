import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@lotto/components/text/text.module';



@NgModule({
  declarations: [
    SectionHeaderComponent,
  ],
  exports: [
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule
  ]
})
export class SectionHeaderModule { }
