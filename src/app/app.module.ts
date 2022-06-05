import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {ManualPageModule} from '@lotto/pages/manual-page/manual-page.module';
import {AutoPageModule} from '@lotto/pages/auto-page/auto-page.module';
import {StatisticsPageModule} from '@lotto/pages/statistics-page/statistics-page.module';
import {LogoModule} from '@lotto/components/logo/logo.module';
import {NoticeLineModule} from '@lotto/components/notice-line/notice-line.module';
import {MessageModule} from '@tk-ui/components/message/message.module';
import {PageTabsModule} from '@lotto/components/page-tabs/page-tabs.module';
import {ApplicationLoadingModule} from '@lotto/components/application-loading/application-loading.module';
import {ModalModule} from '@tk-ui/components/modal/modal.module';
import {FooterModule} from '@lotto/components/footer/footer.module';
import {NoticeListModule} from '@lotto/components/notice-list/notice-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ManualPageModule,
    AutoPageModule,
    StatisticsPageModule,
    LogoModule,
    NoticeLineModule,
    MessageModule,
    PageTabsModule,
    ApplicationLoadingModule,
    ModalModule,
    FooterModule,
    NoticeListModule,
  ],
  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
