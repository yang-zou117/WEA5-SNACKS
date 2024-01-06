import { Component } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';

@Component({
  selector: 'wea5-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  // paramters for querying restaurants in proximity
  maxDistance: number = 0; 
  latitude: number = 0;
  longitude: number = 0;
  shouldBeOpen: boolean = false;

  constructor(private snacksService: SnacksServiceService) { }

  getLocation() {
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
    // In angular when i get from the server a json 0bject like: 
    // [ { "restaurant": { "restaurantId": 1, "restaurantName": "Hello}, "distance: 112,7"} ] 
    // how should i convert this to appropriate objects of classes
  }


}
