import { Component, ViewChild } from '@angular/core';
import { Address } from '../shared/address';
import { RestaurantForCreation } from '../shared/restaurant-for-creation';
import { OpeningHours } from '../shared/opening-hours';
import { ClosingDay } from '../shared/closing-day';
import { NgForm } from '@angular/forms';
import { RegisterRestaurantErrorMessages } from './register-restaurant-error-messages';
import { SnacksServiceService } from '../shared/snacks-service.service';

@Component({
  selector: 'wea5-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styles: []
})
export class RegisterRestaurantComponent {

  @ViewChild('myForm', {static: true}) myForm!: NgForm;
  errors: { [key: string]: string } = {};

  // data model for the form 
  address: Address  = new Address();
  restaurant: RestaurantForCreation = new RestaurantForCreation();
  openingHours: OpeningHours[] = [];
  closingDays: ClosingDay[] = [];

  weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  apiKey: string | undefined; // api key for new registered restaurant
  restaurantId: number | undefined; // id of new registered restaurant

  ngOnInit() {
    this.myForm.statusChanges?.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of RegisterRestaurantErrorMessages) {
         const control = this.myForm.form.get(message.forControl) || {dirty: false, invalid: false, errors: []};

        if (control &&
            (control.dirty )&&
            control.invalid &&
            control.errors != null &&
            control.errors[message.forValidator] &&
            !this.errors[message.forControl]) {
            this.errors[message.forControl] = message.text;
        }
    }
  }

  resetData() {
    this.restaurant = new RestaurantForCreation();
    this.address = new Address();
    this.openingHours = [];
    this.closingDays = [];
    this.openingHours.push(new OpeningHours());
    this.myForm.resetForm();
    this.updateErrorMessages();
  }

  constructor(private snacksService: SnacksServiceService) { 
    this.openingHours.push(new OpeningHours());
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.address.gpsLatitude = position.coords.latitude;
        this.address.gpsLongitude = position.coords.longitude;
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      alert("Geolocation is not supported by this browser. Please use a different browser or enter the location manually.");
    }
  }

  onImageFileSelected(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.restaurant.imageData = fileReader.result?.toString().split(',')[1] || '';
      this.restaurant.fileType = file.name.split('.').pop() as string;
    }

    if(file) {
      fileReader.readAsDataURL(file);
    }
  }

  addOpeningHours() {
    this.openingHours.push(new OpeningHours());
  }

  popOpeningHours() {
    this.openingHours.pop();
  }

  addClosingDay() {
    this.closingDays.push(new ClosingDay());
  }

  popClosingDay() {
    this.closingDays.pop();
  }

  register(event: Event) {
    event.preventDefault();
    if(!this.myForm.form.valid) { 
      this.updateErrorMessages();
      return; 
    }

    // compute values for closing days 
    // better approach is to use triggers in the database but during the implementation of Backend, it was not done
    for(let weekDay of this.weekdays) {
      let found = false;
      for(let entry of this.openingHours) {
        if(entry.weekDay === weekDay) {
          found = true;
          break;
        }
      }
      if(!found) {
        this.closingDays.push(new ClosingDay(weekDay));
      }
    }

    this.snacksService.registerRestaurant(
      this.restaurant, this.address, 
      this.openingHours, this.closingDays).subscribe(
      res => {

      this.apiKey = res['apiKeyValue'];
      this.restaurantId = res['restaurantId'];
      this.resetData();
    }); 

  }

}
