import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';
import { DataService } from '../data.service';
import { tap, first} from 'rxjs/operators';
import { Router } from '@angular/router';
// import Typewriter from 't-writer.js';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  playerName: String = '';
  image: String = '';
  artistShort: any
  artistLong: any 
  trackShort: any 
  trackLong: any
  recentlyPlayed: any
  playlists: any
  followers: any 
  addedAlready: boolean = false;
  players: any [] = [];

  signIn: boolean = false;
  title: string = 'Spotify Reflect';

  constructor(private dataService: DataService, private oauthService:OAuthService,
     private router: Router) { 
        
    this.configureSingleSignOn();
  }

  ngOnInit(): void {
    

  
    this.players = JSON.parse(sessionStorage.getItem("players") || "[]");
    console.log(this.players);
    this.oauthService.events.subscribe(event => {
      if (event.type == "token_received"){
        this.signIn = true;
      }
    });
 }

  start(){
    if(this.players.length >= 2){
      console.log("success");
      this.router.navigateByUrl('/home');
    }
    else{
      console.log("more players need");
    }
  }

  retrieveData() {
  
    const getSpotifyData = async() => {
      
      let userDetails = this.getProfile();
      let shortTopArtists = this.getTopArtistShort();
      let longTopArtists = this.getTopArtistLong();
      let shortTopSongs = this.getTopTrackShort();
      let longTopSongs = this.getTopTrackLong();
      let recentlyPlayed = this.getRecentlyPlayed();
      let playlists = this.getPlaylists();
      let spotifyData = Promise.all([userDetails, shortTopArtists, longTopArtists,
      shortTopSongs, longTopSongs, recentlyPlayed, playlists]);
      return spotifyData;
    }
    getSpotifyData().then(()=> {
      if(this.addedAlready === false){
        this.dataService.deleteUser(JSON.stringify({
          "name": this.playerName
          })).subscribe(data => {
            console.log(data);
            this.postToDB();
          });
      }

    });
  }
  
  getProfile() {

    return this.dataService.getProfile().pipe(
      tap(data => {
        let userDetails = JSON.parse(JSON.stringify(data));
        this.playerName = userDetails.display_name;
        this.players.forEach(player => {
          if(player.name === this.playerName){
            this.addedAlready = true;
          }
        })
        if(userDetails.images.length != 0){
          this.image = userDetails.images[0].url;
        }
        else{
          this.image = '../../assets/images/defaultProfileImage.png';
        }
        let player = {
          "name": this.playerName,
          "image": this.image,
        };
        this.followers = userDetails.followers.total;
        if(this.addedAlready === false){
          this.players.push(player);
          sessionStorage.setItem("players", JSON.stringify(this.players));
        }
      }),
      first()
    ).toPromise();
  }

  getTopArtistShort() {
    return this.dataService.getTopArtistShort().pipe(
      tap(data => {
        let artist = [];
        let artistShortData: any = JSON.parse(JSON.stringify(data));
        console.log(artistShortData);
        //loop through top 20 tracks //
        for(let i = 0; i < 20; i++){
          if(artistShortData.items[i]){
            artist.push({
              "name":artistShortData.items[i].name ,
              "image": artistShortData.items[i].images[0].url,
              "popularity": artistShortData.items[i].popularity,
              "genres": artistShortData.items[i].genres
            });
          }
        }
        this.artistShort = artist;
      }),
      first()
    ).toPromise();    
  }

  getTopArtistLong() {
    return this.dataService.getTopArtistLong().pipe(
      tap(data => {
        let artist = [];
        let artistLongData: any = JSON.parse(JSON.stringify(data));

        //loop through top 50 tracks //
        for(let i = 0; i < 50; i++){
          if(artistLongData.items[i]){
            artist.push({
              "name": artistLongData.items[i].name ,
              "image": artistLongData.items[i].images[0].url,
              "popularity": artistLongData.items[i].popularity,
              "genres": artistLongData.items[i].genres
            });
          }  

        }
        this.artistLong = artist;
      }),
      first()
    ).toPromise();
  }
  getTopTrackLong() {
    return this.dataService.getTopSongLong().pipe(
      tap(data => {
        let track = [];
        let trackLongData: any = JSON.parse(JSON.stringify(data));

        //loop through top 50 tracks //
        for(let i = 0; i < 50; i++){
          if(trackLongData.items[i]){
            track.push({
              "name": trackLongData.items[i].name ,
              "image": trackLongData.items[i].album.images[0].url,
              "popularity": trackLongData.items[i].popularity,
              "preview": trackLongData.items[i].preview_url
            });
          }
        }
        this.trackLong = track;
      }),
      first()
    ).toPromise();
  }
  getTopTrackShort() {
    return this.dataService.getTopSongShort().pipe(
      tap(data => {
        let track = [];
        let trackShortData: any = JSON.parse(JSON.stringify(data));
        console.log(trackShortData);

        //loop through top 50 tracks //
        for(let i = 0; i < 50; i++){
          if(trackShortData.items[i]){
            track.push({
              "name": trackShortData.items[i].name ,
              "image": trackShortData.items[i].album.images[0].url,
              "popularity": trackShortData.items[i].popularity,
              "preview": trackShortData.items[i].preview_url
            });
          }
        }
        this.trackShort = track;
      }),
      first()
    ).toPromise();
  }
  getRecentlyPlayed() {
    return this.dataService.getRecentlyPlayed().pipe(
      tap(data => {
        let track = [];
        let recentlyPlayedTracks: any = JSON.parse(JSON.stringify(data));
        console.log(recentlyPlayedTracks);

        //loop through top 50 tracks //
        for(let i = 0; i < 25; i++){
          if(recentlyPlayedTracks.items[i]){
            track.push({
              "name": recentlyPlayedTracks.items[i].track.name ,
              "image": recentlyPlayedTracks.items[i].track.album.images[0].url,
              "preview": recentlyPlayedTracks.items[i].track.preview_url,
              "time": recentlyPlayedTracks.items[i].played_at
            });
          }
        }
        this.recentlyPlayed = track;
        console.log(this.recentlyPlayed);
      }),
      first()
    ).toPromise();
  }

  getPlaylists(){
    return this.dataService.getPlaylists().pipe(
      tap(data => {
        let playlist = [];
        let playlists: any = JSON.parse(JSON.stringify(data));

        //loop through all playlists //
        for(let i = 0; i < 50; i++){
          if(playlists.items[i] && playlists.items[i].owner.display_name == this.playerName && playlists.items[i].images.length != 0){
            playlist.push({
              "name": playlists.items[i].name,
              "image": playlists.items[i].images[0].url,
              "description": playlists.items[i].description,
            });
          }
        }
        this.playlists = playlist;
        console.log(this.recentlyPlayed);
      }),
      first()
    ).toPromise();
  }


  postToDB(){
    console.log(this.playlists);
    
    this.dataService.postUser(JSON.stringify({
      "name": this.playerName,
      "profileImage": this.image,
      "shortTopArtists": this.artistShort,
      "shortTopSongs": this.trackShort,
      "longTopArtists": this.artistLong,
      "longTopSongs": this.trackLong,
      "followers": this.followers,
      "recentlyPlayed": this.recentlyPlayed,
      "playlists": this.playlists
    })).subscribe(
      feedback => {
        console.log(feedback);
      }
    ); 
  }

  configureSingleSignOn(){

    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tryLogin();
    this.oauthService.events.subscribe(event => {
      if (event.type == "token_received"){
        this.retrieveData();
      }
    });
  }
  login(){

    this.oauthService.initLoginFlow();
  }
}
