import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from '@lotto/pages/main/main.module';
import {SubscriptionService} from '@tk-ui/services/common/subscription.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingCoverModule} from '@lotto/components/loading-cover/loading-cover.module';
import {ModalModule} from '@tk-ui/components/modal/modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingCoverModule,
    ModalModule,
  ],
  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
