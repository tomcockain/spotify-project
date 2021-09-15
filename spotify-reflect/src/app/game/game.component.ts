import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';
import { animate, query, state, style, transition, trigger } from '@angular/animations';

declare var Typewriter: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
  
export class GameComponent implements OnInit {

  constructor(private dataService: DataService) { }

  questionState: boolean = true;
  count: number = 0;

  ngOnInit(): void {
    

  }
  questionRotate(count: number){
    
  
  } 
  nextQuestion(){
    if(this.count%2 == 0){
      this.questionState = false;
    }
    else{
      this.questionState = true; 
    }
    this.count++;
  }
}