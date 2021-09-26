import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-top10',
  templateUrl: './game-top10.component.html',
  styleUrls: ['./game-top10.component.css'],
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
export class GameTop10Component implements OnInit {

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
