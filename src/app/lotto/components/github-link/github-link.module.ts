import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubLinkComponent } from './github-link.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@lotto/components/text/text.module';



@NgModule({
  declarations: [
    GithubLinkComponent
  ],
  exports: [
    GithubLinkComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule
  ]
})
export class GithubLinkModule { }
