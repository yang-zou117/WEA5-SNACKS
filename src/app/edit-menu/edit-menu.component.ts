import { Component } from '@angular/core';
import { SnacksService } from '../services/snacks-service.service';
import { MenuItem } from '../shared/menu-item';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'wea5-edit-menu',
  templateUrl: './edit-menu.component.html',
  styles: [
  ]
})
export class EditMenuComponent {

  existingItems: MenuItem[] = []

  newItems: MenuItem[] = []
  newItem: MenuItem = new MenuItem();

  successMessage: string = "";
  errorMessage: string = "";

  constructor(private snacksService: SnacksService, 
              private auth: AuthenticationService) { }

  addNewMenuItem() {
    this.newItems.push(this.newItem);
    this.newItem = new MenuItem();
    this.resetSuccessErrorMessages();
  }

  resetSuccessErrorMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }

  saveNewItems() {
    this.resetSuccessErrorMessages();

    if(this.newItems.length === 0) {
      this.errorMessage = "Please add at least one menu item.";
      return;
    }

    // get restaurant id and api key from local storage
    const restaurantId = this.auth.getUsernameFromToken();
    const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
    const apiKey = apiKeys[restaurantId];

    // save new menu items
    this.snacksService.postNewMenuItems(this.newItems, restaurantId, apiKey).subscribe(
      (res) => {
        if(res === null) {
          this.errorMessage = "Erro occured: New menu items could not be saved. Try again later.";
        } else {
          this.successMessage = "New menu items have been saved.";
          this.newItems = [];
        }
      }
    );
    
  }

}
