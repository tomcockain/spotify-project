import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { GameInfiniteComponent } from './game-infinite/game-infinite.component';
import { GamePlaylistComponent } from './game-playlist/game-playlist.component';

const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'original', component: GameComponent},
  {path: 'discover', component: GameInfiniteComponent},
  {path: 'playlist', component: GamePlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [GameComponent, AuthenticationComponent];