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


  updateItem(menuItem: MenuItem) {
    this.resetSuccessErrorMessages();

    if(menuItem === undefined) {
      return;
    }
    
    // check if all fields are filled
    if(menuItem.menuItemName && menuItem.price && menuItem.categoryName) {
      const restaurantId = this.auth.getUsernameFromToken();
      const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
      const apiKey = apiKeys[restaurantId];

      this.snacksService.updateMenuItem(menuItem, restaurantId, apiKey).subscribe(
        (res) => {
          this.successMessage = "Menu item has been updated.";
          this.loadExistingItems();
          window.scrollTo(0,0);
        }
      );

    } else {
      this.errorMessage = "Please fill all fields for name, price and category.";
      window.scrollTo(0,0);
      return;
    }
    

  }

}
