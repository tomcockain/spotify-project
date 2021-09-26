import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  
  constructor(private router: Router ) { }

  ngOnInit(): void {
    
  }
  original(){
    this.router.navigateByUrl('/home/challenge');
  }
  discover(){
    this.router.navigateByUrl('/home/discover');
  }
  playlist(){
    this.router.navigateByUrl('/home/playlist');
  }
  top10(){
    this.router.navigateByUrl('/home/top10');
  }


}
