import { Component, OnInit } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';

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

  cartItems: CartItem[] = [];
  restaurantName: string = '';

  ngOnInit() {
    this.loadCartItems();
  }

  constructor(private snacksService:SnacksServiceService) { }

  loadCartItems() {
    const cart = localStorage.getItem('wea5-cart');
    if (cart) {
      const cartString = JSON.parse(cart);
      console.log(cartString.items)
      this.cartItems = Object.values(cartString.items);


      this.restaurantName = cartString.restaurantName;
    }
  }

  clearCart() {
    localStorage.removeItem('wea5-cart');
    this.cartItems = [];
    this.restaurantName = '';
  }
}
