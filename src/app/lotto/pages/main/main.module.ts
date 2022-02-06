import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {HeaderModule} from '@lotto/components/header/header.module';
import {LottoDrawerModule} from '@lotto/components/lotto-drawer/lotto-drawer.module';
import {StatisticsModule} from '@lotto/components/statistics/statistics.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    LottoDrawerModule,
    StatisticsModule
  ]
})
export class MainModule {
}
