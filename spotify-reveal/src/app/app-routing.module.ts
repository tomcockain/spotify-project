import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { GameInfiniteComponent } from './game-infinite/game-infinite.component';
import { GamePlaylistComponent } from './game-playlist/game-playlist.component';
import { GameTop10Component } from './game-top10/game-top10.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/challenge', component: GameComponent},
  {path: 'home/discover', component: GameInfiniteComponent},
  {path: 'home/playlist', component: GamePlaylistComponent},
  {path: 'home/top10', component: GameTop10Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [GameComponent, AuthenticationComponent];