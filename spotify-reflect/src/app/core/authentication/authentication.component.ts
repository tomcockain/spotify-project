import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from './sso.config';
import { DataService } from '../../data.service';
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @Output() public signInEvent = new EventEmitter<boolean>();



  playerName: String = '';
  image: String = '';
  artistShort: any
  artistLong: any 
  trackShort: any 
  trackLong: any
  followers: any 

  players: String[] = [];

  
  constructor(private dataService: DataService, private oauthService:OAuthService) { 
    this.configureSingleSignOn();
  }

  ngOnInit(): void {
    
  }

  retrieveData() {
    

    const getSpotifyData = async() => {

      let userDetails = this.getProfile();
      let shortTopArtists = this.getTopArtistShort();
      let longTopArtists = this.getTopArtistLong();
      let shortTopSongs = this.getTopTrackShort();
      let longTopSongs = this.getTopTrackLong();
      let spotifyData = Promise.all([userDetails, shortTopArtists, longTopArtists,
      shortTopSongs, longTopSongs]);
      return spotifyData;
    }
    getSpotifyData().then(()=> {
      console.log(this.trackLong);
      this.postToDB();
     });
  }

  
  getProfile() {

    return this.dataService.getProfile().pipe(
      tap(data => {
        let userDetails = JSON.parse(JSON.stringify(data));
        this.playerName = userDetails.display_name;
        console.log(this.playerName);
        this.image = userDetails.images[0].url;
        this.followers = userDetails.followers.total;
      }),
      first()
    ).toPromise();
  }

  getTopArtistShort() {
    return this.dataService.getTopArtistShort().pipe(
      tap(data => {
        let artist = [];
        let artistShortData: any = JSON.parse(JSON.stringify(data));
        //loop through top 20 tracks //
        for(let i = 0; i < 20; i++){
          
          artist.push({
            "name":artistShortData.items[i].name ,
            "image": artistShortData.items[i].images[0].url,
            "popularity": artistShortData.items[i].popularity,
            "genres": artistShortData.items[i].genres
          });
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
          artist.push({
            "name": artistLongData.items[i].name ,
            "image": artistLongData.items[i].images[0].url,
            "popularity": artistLongData.items[i].popularity,
            "genres": artistLongData.items[i].genres
          });
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
          track.push({
            "name": trackLongData.items[i].name ,
            "image": trackLongData.items[i].album.images[0].url,
            "popularity": trackLongData.items[i].popularity,
          });
          
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
          track.push({
            "name": trackShortData.items[i].name ,
            "image": trackShortData.items[i].album.images[0].url,
            "popularity": trackShortData.items[i].popularity,
          });
        }
        this.trackShort = track;
      }),
      first()
    ).toPromise();
  }


  postToDB(){

  console.log(this.artistShort);
  console.log(this.artistLong);
  console.log(this.trackShort);
  console.log(this.trackLong);
  console.log(this.image);
  console.log(this.followers);


    this.dataService.postUser(JSON.stringify({
      "name": this.playerName,
      "profileImage": this.image,
      "shortTopArtists": this.artistShort,
      "shortTopSongs": this.trackShort,
      "longTopArtists": this.artistLong,
      "longTopSongs": this.trackLong,
      "followers": this.followers,

      
    })).subscribe(
      feedback => {
        console.log(feedback);
      }
    ); 
  }

  configureSingleSignOn(){

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
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
