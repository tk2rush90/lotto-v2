import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticsComponent} from './statistics.component';
import {WinningStatisticsComponent} from './winning-statistics/winning-statistics.component';
import {SectionHeaderModule} from '@lotto/components/section-header/section-header.module';
import {InfoLabelModule} from '@lotto/components/info-label/info-label.module';
import {TextModule} from '@lotto/components/text/text.module';
import {InlineButtonModule} from '@tk-ui/components/inline-button/inline-button.module';
import {SubHeaderModule} from '@lotto/components/sub-header/sub-header.module';
import {ChosenStatisticsComponent} from './chosen-statistics/chosen-statistics.component';
import {WinningStatisticsDetailComponent} from './winning-statistics-detail/winning-statistics-detail.component';
import {ModalModule} from '@tk-ui/components/modal/modal.module';
import {WinningDetailItemComponent} from './winning-detail-item/winning-detail-item.component';
import {IconModule} from '@tk-ui/components/icon/icon.module';


@NgModule({
  declarations: [
    StatisticsComponent,
    WinningStatisticsComponent,
    ChosenStatisticsComponent,
    WinningStatisticsDetailComponent,
    WinningDetailItemComponent
  ],
  exports: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    SectionHeaderModule,
    InfoLabelModule,
    TextModule,
    InlineButtonModule,
    SubHeaderModule,
    ModalModule,
    IconModule,
  ]
})
export class StatisticsModule {
}
