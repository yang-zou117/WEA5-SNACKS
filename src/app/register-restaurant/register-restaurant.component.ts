import { Component } from '@angular/core';
import { Address } from '../shared/address';
import { RestaurantForCreation } from '../shared/restaurant-for-creation';
import { OpeningHours } from '../shared/opening-hours';
import { ClosingDay } from '../shared/closing-day';

@Component({
  selector: 'wea5-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styles: [
  ]
})
export class RegisterRestaurantComponent {

  address: Address = new Address();
  restaurant: RestaurantForCreation = new RestaurantForCreation();
  openingHours: OpeningHours[] = [];
  openingHoursSize: number = 1; 
  closingDays: ClosingDay[] = [];
  closingDaysSize: number = 1;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.address.latitude = position.coords.latitude;
        this.address.longitude = position.coords.longitude;
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      alert("Geolocation is not supported by this browser. Please use a different browser or enter the location manually.");
    }
  }

  onImageFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.restaurant.imageFile = inputElement.files[0];
    }
  }

  register() {
    const test = (this.restaurant, this.address)
    console.log(JSON.stringify(this.restaurant));
  }

}
