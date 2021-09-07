import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';

import { DataService } from './data.service';

import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { LogoComponent } from './core/logo/logo.component';
import { AuthenticationComponent} from './core/authentication/authentication.component'
import {NgxTypedJsModule} from 'ngx-typed-js';
import { LogoFrozenComponent } from './core/logo-frozen/logo-frozen.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LogoComponent,
    AuthenticationComponent,
    LogoFrozenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost'],
        sendAccessToken: true
      }
    }),
    NgxTypedJsModule
  ],
  providers: [DataService, {
    provide:OAuthStorage, useValue: localStorage
  }],
            
  bootstrap: [AppComponent]
})
export class AppModule { }
