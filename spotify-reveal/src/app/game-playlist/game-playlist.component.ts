import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game-playlist',
  templateUrl: './game-playlist.component.html',
  styleUrls: ['./game-playlist.component.css'],
  animations: [
    trigger('scoreAnimation', [
        state('gameEnd', style({ transform: 'translateY(-800px)', 'font-size': '100px'})),
        transition('* => gameEnd', animate('1500ms ease-out' ))   
      ])
  ]
})
export class GamePlaylistComponent implements OnInit {

  constructor( private router: Router) { }

  question1State: string = "";
  question2State: string = "";
  questionShow1: boolean = true;
  questionShow2: boolean = false;
  players: any;
  playerCount: number = 0;
  correctQuestions: number = 0;
  questionCount: number = 0;
  correctCheck: boolean = false;
  answerShown: boolean = false;
  scoreState: string = "";

  reactionGif: string = "";
  


  ngOnInit(): void {
    this.question1State = "middle";
    this.players = JSON.parse(sessionStorage.getItem("players") || "[]");
    this.playerCount = this.players.length;
  }

  nextQuestion(){
    this.questionCount++;
    if(this.correctCheck){
      this.correctQuestions++
    }
    this.correctCheck = false;
    if(this.questionCount == 20){
      this.answerShown = false;
      if(this.questionCount%2 == 1){
        this.question1State = "end";
        setTimeout(()=> this.questionShow1 = false, 1500);    
      }
      else{
        this.question2State = "end";
        setTimeout(()=> this.questionShow2 = false, 1500);
      }
      this.scoreState = "gameEnd";
      setTimeout(()=> this.resultReaction(), 1500)
    }
    else{
      if(this.questionCount%2 == 1){
        this.questionShow2 = true;
        this.question1State = "end";
        this.question2State = "middle";
        setTimeout(()=> this.questionShow1 = false, 1500);    
      }
      else{
        this.questionShow1 = true;
        this.question1State = "middle";
        this.question2State = "end";
        setTimeout(()=> this.questionShow2 = false, 1500);
      }
      this.answerShown = false;
    }
  }
  revealAnswer(answerSelected: any){
    if(answerSelected == "true"){
      this.correctCheck = true;
    }
    this.answerShown = true;
  }
  resultReaction(){
    let fractionScore = this.correctQuestions/this.questionCount;
    if(fractionScore >= 0.8){
      this.reactionGif = "https://media2.giphy.com/media/u4CY9BW4umAfu/giphy.gif?cid=ecf05e4787p6d6qjq07eyci1spjoqle6sa74jda8vqs3vsud&rid=giphy.gif&ct=g";
    }
  }
  home(){
    this.router.navigateByUrl('/home');
  }
}
