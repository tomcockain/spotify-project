import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopSongsAndArtistsComponent } from './game/top-songs-and-artists/top-songs-and-artists.component';
import { LogoFrozenComponent } from './logo-frozen/logo-frozen.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';
import { GameInfiniteComponent } from './game-infinite/game-infinite.component';
import { GamePlaylistComponent } from './game-playlist/game-playlist.component';
import { QuestionGeneratorPlaylistComponent} from './game-playlist/question-generator-playlist/question-generator-playlist.component';



@NgModule({
  declarations: [ 
    AppComponent,
    routingComponents,
    LogoFrozenComponent,
    TopSongsAndArtistsComponent,
    LogoAnimationComponent,
    GameInfiniteComponent,
    GamePlaylistComponent,
    QuestionGeneratorPlaylistComponent
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
