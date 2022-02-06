import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';
import {TextModule} from '@lotto/components/text/text.module';
import {GithubLinkModule} from '@lotto/components/github-link/github-link.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    TextModule,
    GithubLinkModule
  ]
})
export class HeaderModule { }
