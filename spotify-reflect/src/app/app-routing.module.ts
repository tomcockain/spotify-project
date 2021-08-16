import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';    
import { LogoComponent } from './core/logo/logo.component';


const routes: Routes = [
  {path: '', component: LogoComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LogoComponent, HomeComponent, AuthenticationComponent];