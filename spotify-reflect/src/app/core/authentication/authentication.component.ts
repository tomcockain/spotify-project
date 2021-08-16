import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {


  constructor(private oauthService:OAuthService){

    this.configureSingleSignOn();
  }

  configureSingleSignOn(){

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tryLogin();
    

  }
  login(){

    this.oauthService.initCodeFlow();
    
    
  }

  ngOnInit(): void {
  }

}
