import { Component } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../shared/data-sharing-service';

@Component({
  selector: 'wea5-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  // paramters for querying restaurants in proximity
  maxDistance: number = 10000; 
  latitude: number = 0;
  longitude: number = 0;
  shouldBeOpen: boolean = false;

  isButtonDisabled:boolean = false; 

  constructor(private snacksService: SnacksServiceService, 
              private router: Router, 
              private dataSharingService: DataSharingService) { }

  // get the user's location
  getLocation($event: Event) {
    $event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      alert("Geolocation is not supported by this browser. Please use a different browser or enter the location manually.");
    }
  }

  search() {

    if(this.maxDistance === 0) {
      alert("Please enter a distance.");
      return;
    }

    this.isButtonDisabled = true;

    this.snacksService.getRestaurantsInProximity(this.maxDistance, this.latitude, 
                       this.longitude, this.shouldBeOpen).subscribe((res) => {
      if(res === null) {
        alert("An error occured. Please try again later.");
        return;
      }
      this.isButtonDisabled = false;

      // set the search results and navigate to the search results component
      this.dataSharingService.setSearchResults(res);
      this.router.navigate(['../search-results'])
    });

  }


}
