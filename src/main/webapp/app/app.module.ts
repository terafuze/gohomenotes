import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SharedModule } from 'app/shared';
import { CoreModule } from 'app/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { FeaturesModule } from './features/features.module';
import * as moment from 'moment';
import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';

import {
  JhiMainComponent,
  NavbarComponent,
  FeaturesMenuComponent,
  FooterComponent,
  PageRibbonComponent,
  ActiveMenuDirective,
  ErrorComponent
} from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'en'
    }),
    SharedModule.forRoot(),
    CoreModule,
    HomeModule,
    AccountModule,
    FeaturesModule,
    AppRoutingModule,
    AmplifyAngularModule
  ],
  declarations: [
    JhiMainComponent,
    NavbarComponent,
    FeaturesMenuComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    },
    {
      provide: AmplifyService,
      useFactory: () => {
        return AmplifyModules({
          Auth
        });
      }
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class AppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
