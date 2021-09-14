import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';
import { animate, query, state, style, transition, trigger } from '@angular/animations';
declare var Typewriter: any;
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('questionAnimation', [
        state('start', style({ transform: 'translateY(-150%)' })),
        state('middle', style({ transform: 'translateY(0)' })),
        transition('* => start', animate(0)),
        transition('* => middle', animate('1500ms ease-in')),
          
      ]),
      // transition('* => void', [
      //   animate(100, style({ transform: 'translateX(100%)' }))]
        // // query('h1', style({transform: 'translateY(-100%'})),
        // query('.image', style({transform: 'translateY(-100%'})),
        // // query('h1', animate('1000ms ease-in', style({transform: ''}))),
        // query('.image', animate('1000ms ease-in', style({transform: ''}))),
        

      // )
  ]
})
export class GameComponent implements OnInit {

  constructor(private dataService: DataService) { }


  topQuestionTypes: string[] = ["shortTopArtists", "longTopArtists", "shortTopSongs", "longTopSongs"]
  Score: number[] = [0,0];
  question: string = '';
  questionVariable: string = ""; 
  questionImage: string = "";
  index: number = 0;
  state: any = 'start';

  ngOnInit(): void {
    this.topSongsOrArtists();
    // const target = document.querySelector('.tw')
    // const writer = new Typewriter(target, {
    //   loop: true,
    //   typeColor: 'blue'
    // });
    
    // writer
    //   .type('A simple syntax makes it easy.')
    //   .rest(500)
    //   .start();
             
  }

  questionSelect(questionArray: string[]){
    return questionArray[Math.floor(Math.random()*questionArray.length)];
  }

  playerSelect(){
    let players = JSON.parse(sessionStorage.getItem("players") || "[]");
    console.log(Math.floor(Math.random()*players.length));
    return players[Math.floor(Math.random()*players.length)].name;
  }

  topSongsOrArtists(){
    let player = this.playerSelect();
    let question = this.questionSelect(this.topQuestionTypes);
    let questionType = "";
    let ArrayPeriod = "";
    var httpParams = new HttpParams()
      .set("name", player)
    this.dataService.getUser(httpParams).subscribe(data => {
      const userStats = JSON.parse(JSON.stringify(data));
      console.log(userStats);
      console.log(question);
      const index = Math.floor(Math.random()*userStats[question].length);
      const questionVariable = userStats[question][index].name;
      this.questionImage = userStats[question][index].image;
      const questionType = this.songOrArtist(question);
      const timePeriod = this.timePeriod(question);
      this.question = "Whose number ".concat(index.toString() + " most played " + 
        questionType + " of " + timePeriod + " is ... " + questionVariable) + "?";
      this.state = 'middle'
      
    })
  }

  songOrArtist(question: string){
    
    if(question.includes("Song")){
      return "song";
    }
    else{
      return "artist";
    }
  }

  timePeriod(question: string){

    if(question.includes("short")){
      return "4 weeks";
    }
    else{
      return "all time";
    }
  }

}

