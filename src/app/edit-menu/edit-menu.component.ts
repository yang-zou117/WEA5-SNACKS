import { Component } from '@angular/core';
import { SnacksService } from '../services/snacks-service.service';
import { MenuItem } from '../shared/menu-item';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'wea5-edit-menu',
  templateUrl: './edit-menu.component.html',
  styles: [
  ],
})
export class EditMenuComponent {

  existingItems: MenuItem[] = []

  newItems: MenuItem[] = []
  newItem: MenuItem = new MenuItem();

  successMessage: string = "";
  errorMessage: string = "";

  constructor(private snacksService: SnacksService, 
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.loadExistingItems();
  }

  loadExistingItems() {
    const restaurantId = this.auth.getUsernameFromToken();
    const restaurantIdNumber = parseInt(restaurantId);
    this.snacksService.getMenuItems(restaurantIdNumber).subscribe(
      (data) => {
        this.existingItems = data;
      }
    );
  }

  addNewMenuItem() {
    this.newItems.push(this.newItem);
    this.newItem = new MenuItem();
    this.resetSuccessErrorMessages();
  }

  resetSuccessErrorMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }

 

  saveNewItemsButtonDisabled: boolean = false;
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
    this.saveNewItemsButtonDisabled = true;
    this.snacksService.postNewMenuItems(this.newItems, restaurantId, apiKey).subscribe(
      (res) => {
        if(res === null) {
          this.errorMessage = "Erro occured: New menu items could not be saved. Try again later.";
        } else {
          this.successMessage = "New menu items have been saved.";
          this.newItems = [];
          this.loadExistingItems();
        }
        this.saveNewItemsButtonDisabled = false;
      }
    );
    
  }

  deleteItem(menuItemId: number | undefined) {
    if(menuItemId === undefined) {
      return;
    }
    
    const confirmDelete = confirm("Are you sure you want to delete this menu item?");
    if(!confirmDelete) {
      return;
    }

    this.resetSuccessErrorMessages();
    const restaurantId = this.auth.getUsernameFromToken();
    const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
    const apiKey = apiKeys[restaurantId];

    this.snacksService.deleteMenuItem(menuItemId, restaurantId, apiKey).subscribe(
      (res) => {
        this.successMessage = "Menu item has been deleted.";
        window.scrollTo(0,0);
        this.loadExistingItems();
      }
    );
  }


  updateExistingItems() {
    this.resetSuccessErrorMessages();

    // check if all existing items have valid name, price and category
    for(let item of this.existingItems) {
      if(!item.menuItemName || !item.price || !item.categoryName) {
        this.errorMessage = "Please fill all fields for name, price and category.";
        window.scrollTo(0,0);
        return;
      }
    }
    
    // check if all fields are filled
    const restaurantId = this.auth.getUsernameFromToken();
    const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
    const apiKey = apiKeys[restaurantId];

    this.snacksService.updateMenuItems(this.existingItems, restaurantId, apiKey).subscribe(
      (res) => {
        this.successMessage = "Menu item has been updated.";
        this.loadExistingItems();
        window.scrollTo(0,0);
      }
    );
    
  }

}
