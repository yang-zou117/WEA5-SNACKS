import { Component, ViewChild } from '@angular/core';
import { Address } from '../shared/address';
import { RestaurantForCreation } from '../shared/restaurant-for-creation';
import { OpeningHours } from '../shared/opening-hours';
import { ClosingDay } from '../shared/closing-day';
import { NgForm } from '@angular/forms';
import { RegisterRestaurantErrorMessages } from './register-restaurant-error-messages';

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
    this.closingDays.push(new ClosingDay());
    this.myForm.resetForm();
    this.updateErrorMessages();
  }

  constructor() { 
    this.openingHours.push(new OpeningHours());
    this.closingDays.push(new ClosingDay());
  }

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

  register() {
    const valid = this.myForm.form.valid;
    if(!this.myForm.form.valid) { 
      this.updateErrorMessages();
      return; 
    }

    alert("Restaurant registered!" + valid);
    this.resetData();

  
    
  }

}
