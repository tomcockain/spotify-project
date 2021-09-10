import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { AuthenticationComponent } from './authentication/authentication.component';


const routes: Routes = [
  {path: '', component: AuthenticationComponent},
  {path: 'play', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [GameComponent, AuthenticationComponent];