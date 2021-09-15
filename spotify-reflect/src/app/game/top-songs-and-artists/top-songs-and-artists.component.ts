import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-top-songs-and-artists',
  templateUrl: './top-songs-and-artists.component.html',
  styleUrls: ['./top-songs-and-artists.component.css'],
  animations: [
    trigger('questionAnimation', [
        state('start', style({ transform: 'translateX(-150%)' })),
        state('middle', style({ transform: 'translateX(0)' })),
        transition('* => start', animate(0)),
        transition('* => middle', animate('1500ms ease-out')),
        transition(':leave', animate('1500ms ease-out', style({ transform: 'translateX(150%)' })))
          
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

export class TopSongsAndArtistsComponent implements OnInit {

  constructor(private dataService: DataService) { }


  topQuestionTypes: string[] = ["shortTopArtists", "longTopArtists", "shortTopSongs", "longTopSongs"]
  Score: number[] = [0,0];
  question: string = '';
  questionImage: string = "";
  questionVariable: string = "";
  songPreview: string = "";
  index: number = 0;
  state: any = 'start';
  artistOrSong: string = "";

  ngOnInit(): void {
    this.topSongsOrArtists();
  }

  

  // const target = document.querySelector('.tw')
  // const writer = new Typewriter(target, {
  //   loop: true,
  //   typeColor: 'blue'
  // });
  
  // writer
  //   .type('A simple syntax makes it easy.')
  //   .rest(500)
  //   .start();
           


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
    var httpParams = new HttpParams()
      .set("name", player)
    this.dataService.getUser(httpParams).subscribe(data => {
      const userStats = JSON.parse(JSON.stringify(data));
      console.log(userStats);
      console.log(question);
      const index = Math.floor(Math.random()*userStats[question].length);
      const questionVariable = userStats[question][index].name;
      const questionType = this.songOrArtist(question, userStats, index);
      const timePeriod = this.timePeriod(question);
      
      this.questionImage = userStats[question][index].image;
      this.question = "Whose number ".concat(index.toString() + " most played " + 
        questionType + " of " + timePeriod + " is ... ");
      this.state = 'middle'
      
      
    })
  }
  

  songOrArtist(question: string, userStats: any, index: number){
    
    if(question.includes("Song")){
      this.songPreview = userStats[question][index].preview;
      console.log(this.songPreview);
      let audio = <HTMLVideoElement> document.getElementById("audio");
      if(audio){
        audio.play();
      }
      return "song";
    }
    else{
      this.songPreview = "";
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



