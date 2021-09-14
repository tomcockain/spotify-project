import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private SPOTIFY_PROFILE = "http://localhost:3000/api/user/profile";
  private SPOTIFY_ARTISTSHORT = "http://localhost:3000/api/user/topArtistShort";
  private SPOTIFY_ARTISTLONG = "http://localhost:3000/api/user/topArtistLong";
  private USER = "http://localhost:3000/api/user";
  private SPOTIFY_SONGSHORT = "http://localhost:3000/api/user/topSongShort";
  private SPOTIFY_SONGLONG = "http://localhost:3000/api/user/topSongLong";
  private SPOTIFY_RECENTPLAYED = "http://localhost:3000/api/user/recentlyplayed";
  private GET_USER = "http://localhost:3000/api/user";

  constructor(private httpClient: HttpClient) {  }

  public getProfile(){

    return this.httpClient.get(this.SPOTIFY_PROFILE);
  }
  public getTopArtistShort(){

    return this.httpClient.get(this.SPOTIFY_ARTISTSHORT);
  }
  public getTopArtistLong(){

    return this.httpClient.get(this.SPOTIFY_ARTISTLONG);
  }
  public postUser(newUser: any): Observable<any>{

    const headers = new HttpHeaders().set("Content-Type",'application/json');
    console.log(newUser);
    return this.httpClient.post(this.USER, newUser, { headers: headers });
  }
  public getTopSongLong(){

    return this.httpClient.get(this.SPOTIFY_SONGLONG);
  }
  public getTopSongShort(){

    return this.httpClient.get(this.SPOTIFY_SONGSHORT);
  }
  public getRecentlyPlayed(){

    return this.httpClient.get(this.SPOTIFY_RECENTPLAYED);
  }
  public deleteUser(user: any): Observable<any>{
    const options = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json'
      }),
      body: user,
    };
    console.log(options);
    return this.httpClient.delete(this.USER, options);
  }
  public getUser(userParams: any): Observable<any>{
    // const options = {
    //   headers: new HttpHeaders({
    //     "Content-Type": 'application/json'
    //   }),
    //   body: user,
    // };
    return this.httpClient.get(this.GET_USER,{ params: userParams});
  }
}