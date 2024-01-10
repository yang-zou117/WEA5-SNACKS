import { Component, OnInit } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';
import { Address } from '../shared/address';
import { OrderForCreation } from '../shared/order-for-creation';

interface CartItem {
  menuItemId: number,
  menuItemName: string,
  menuItemPrice: number,
  amount: number
}


@Component({
  selector: 'wea5-my-cart',
  templateUrl: './my-cart.component.html',
  styles: [
  ]
})
export class MyCartComponent implements OnInit {

  cartItems: { [key: number]: CartItem } = {};
  restaurantName: string = '';
  address: Address = new Address();
  orderForCreation: OrderForCreation = new OrderForCreation(); 

  ngOnInit() {
    this.loadCartItems();
  }

  constructor(private snacksService:SnacksServiceService) { }

  loadCartItems() {
    const cart = localStorage.getItem('wea5-cart');
    if (cart) {
      const cartString = JSON.parse(cart);
      console.log(cartString.items)
      this.cartItems = cartString.items;


      this.restaurantName = cartString.restaurantName;
    }
  }

  clearCart() {
    localStorage.removeItem('wea5-cart');
    this.cartItems = [];
    this.restaurantName = '';
  }

  getNumberOfItems() {
    // iterate over the cartItems and sum up the amount
    let numberOfItems = 0;
    for (const key in this.cartItems) {
      numberOfItems += this.cartItems[key].amount;
    }
    return numberOfItems;
  }

  getItems() {
    return Object.values(this.cartItems);
  }

  saveCartItems() {
    const existingCart = JSON.parse(localStorage.getItem('wea5-cart') || '{}');
    existingCart.items = this.cartItems;
    localStorage.setItem('wea5-cart', JSON.stringify(existingCart));
  }

  increaseItemAmount(item: CartItem) {
    this.cartItems[item.menuItemId].amount++;
    this.saveCartItems();
  }

  decreaseItemAmount(item: CartItem) {
    if (this.cartItems[item.menuItemId].amount === 1) {
      const confirmDelete = confirm('Are you sure you want to remove this item from your cart ?');
      if (confirmDelete) {
        delete this.cartItems[item.menuItemId];
      }
    } else if (this.cartItems[item.menuItemId].amount > 1) {
      this.cartItems[item.menuItemId].amount--;
    }
    this.saveCartItems();
  }

}
