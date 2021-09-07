import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  userDetails: any = [];
  image: String = '';
  artistShort: String [] = [];
  artistLong: String [] = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
    this.retrieveData();
  }

  retrieveData() {
    this.getProfile();
    this.getTopArtistShort();
    this.getTopArtistLong();
    // this.postToDB();
  }

  getProfile() {
    this.dataService.getProfile().subscribe(
        data => {
          this.userDetails = JSON.parse(JSON.stringify(data));
          this.image = this.userDetails.images[0].url;
        },
        error => {
          console.log(error);
        });
  }

  getTopArtistShort() {
    this.dataService.getTopArtistShort().subscribe(
      data => {
        let artistShortData: any = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < 50; i++){
          this.artistShort[i] = artistShortData.items[i].images[0].url;
        }
      },
      error => {
        console.log(error);
      });
  }

  getTopArtistLong() {
    this.dataService.getTopArtistLong().subscribe(
      data => {
        let artistLongData: any = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < 50; i++){
          this.artistLong[i] = artistLongData.items[i].images[0].url;
        }
      },
      error => {
        console.log(error);
      });
  }

  postToDB(){

    this.dataService.postUser(JSON.stringify({
      "name": this.userDetails.display_name,
      "profile_image": this.image,
      "shortTopArtists": this.artistShort,
      "longTopArtists": this.artistLong,
    })).subscribe(
      feedback => {
        console.log(feedback);
      }
    );
  }
}
