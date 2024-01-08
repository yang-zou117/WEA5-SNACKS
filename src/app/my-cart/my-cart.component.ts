import { Component, OnInit } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';

interface CartItem {
  menuItemId: number,
  menuItemName: string,
  amount: number
}


@Component({
  selector: 'wea5-my-cart',
  templateUrl: './my-cart.component.html',
  styles: [
  ]
})
export class MyCartComponent implements OnInit {

  cartItems: CartItem[] = [];

  ngOnInit() {
    this.loadCartItems();
  }

  constructor(private snacksService:SnacksServiceService) { }

  loadCartItems() {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
    }
  }

  clearCart() {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
  }
}
