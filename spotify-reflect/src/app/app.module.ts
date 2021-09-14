import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { LogoComponent } from './logo/logo.component';
import { LogoFrozenComponent } from './logo-frozen/logo-frozen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LogoComponent,
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
    NgxTypedJsModule,
    BrowserAnimationsModule
  ],
  providers: [DataService, {
    provide:OAuthStorage, useValue: localStorage
  }],
            
  bootstrap: [AppComponent]
})
export class AppModule { }
