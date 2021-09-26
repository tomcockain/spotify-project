import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-question-generator-top10',
  templateUrl: './question-generator-top10.component.html',
  styleUrls: ['./question-generator-top10.component.css'],
  animations: [
    trigger('imageAnimation', [
        state('start', style({ transform: 'translateX(-150%)', opacity: 0 })),
        state('middle', style({ transform: 'translateX(0)', opacity: 1 })),
        state('end', style({ transform: 'translateX(150%)', opacity: 0 })),
        transition('* => start', animate(0)),
        transition('* => middle', animate('1500ms ease-out')),
        transition('* => end', animate('1500ms ease-out' ))   
      ]),
      trigger('textAnimation', [
        state('start', style({ opacity: 0 })),
        state('middle', style({ opacity: 1 })),
        state('end', style({ opacity: 0 })),
        transition('* => start', animate(0)),
        transition('* => middle', animate('1500ms ease-in')),
        transition('* => end', animate('1500ms ease-out'))
      ]),
      trigger('cardFlip', [
        state('front', style({ })),
        state('back', style({transform: 'rotateY(180deg)' })),
        transition('* => front', animate(0)),
        transition('* => back', animate('500ms ease')),
      ])
  ]
})
export class QuestionGeneratorTop10Component implements OnInit {

  @Input() state: string = "start";
  @Output() result = new EventEmitter();
  // @Output() answer: string = "";

  constructor(private dataService: DataService) { }

  
  topQuestionTypes: string[] = ["longTopArtists", "longTopSongs"]
  question: string = "";
  questionImage: string = "";
  questionVariable: string = "";
  songPreview: string = "";
  index: number = 0;
  artistOrSong: string = "";
  side: string = "front";
  playerImage: string = "";
  players: any;
  answer: string = "";
  colour: string = "#C7493A";

  ngOnInit(): void {
    this.state = "start";
    this.questionCreate();
  }

  questionSelect(questionArray: string[]){
    return questionArray[Math.floor(Math.random()*questionArray.length)];
  }

  playerSelect(){
    this.players = JSON.parse(sessionStorage.getItem("players") || "[]");
    const player  = this.players[Math.floor(Math.random()*this.players.length)];
    this.playerImage = player.image;
    return player.name;
  }

  questionCreate(){
    let player = this.playerSelect();
    let question = this.questionSelect(this.topQuestionTypes);
    var httpParams = new HttpParams()
      .set("name", player)
    this.dataService.getUser(httpParams).subscribe(data => {
      const userStats = JSON.parse(JSON.stringify(data));
      console.log(userStats);
      console.log(question);
      const index = Math.floor(Math.random()*9);
      this.questionVariable = userStats[question][index].name;
      this.questionImage = userStats[question][index].image;
      const questionType = this.songOrArtist(question, userStats, index);
      if(question == "recentlyPlayed"){
        this.question = "Who has very recently played..."
      }
      else{
        const timePeriod = this.timePeriod(question);
        this.question = "Whose number ".concat(((1 + index).toString()) + " most played " + 
          questionType + " of " + timePeriod + " is ... ");
      }
      this.state = "middle";
      this.answer = player;
    })
  }
  
  songOrArtist(question: string, userStats: any, index: number){
    
    if(question.includes("Song") || question.includes("recently")){
      this.songPreview = userStats[question][index].preview;
      console.log(this.songPreview);
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

  flip(){
    this.side = "back";
  }
  reveal(name: string){
    if(name == this.answer){
      this.colour = "#36ac57";
      this.result.emit("true");
    }
    else{
      this.result.emit();
    }
    this.flip();
  }

}
