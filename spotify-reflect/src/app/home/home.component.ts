import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {'email': 'test@example.com'}
  
  constructor(private oauthService:OAuthService) { }

  ngOnInit(): void {
    // this.dataService.getAll().subscribe((data: any) => {
    //   console.log(data);
    //   this.user = data;
    // });
  }
  

}
