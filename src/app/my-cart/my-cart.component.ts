import { Component, OnInit } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';
import { Address } from '../shared/address';
import { OrderForCreation } from '../shared/order-for-creation';
import { MenuItem } from '../shared/menu-item';
import { OrderedItem } from '../shared/ordered-item';
import { PriceCalculation } from '../shared/price-calculation';
import { PostOrder } from '../shared/post-order';

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
  restaurantId: number = -1;
  restaurantName: string = '';
  address: Address = new Address();
  orderForCreation: OrderForCreation = new OrderForCreation(); 
  totalPrice: number = -1; 
  disableOrderButton: boolean = false;

  ngOnInit() {
    this.loadCartItems();
  }

  constructor(private snacksService:SnacksServiceService) { }

  loadCartItems() {
    const cart = localStorage.getItem('wea5-cart');
    if (cart) {
      const cartString = JSON.parse(cart);
      this.cartItems = cartString.items;
      this.restaurantName = cartString.restaurantName;
      this.restaurantId = cartString.restaurantId;
    }
  }

  clearCart() {
    localStorage.removeItem('wea5-cart');
    this.cartItems = [];
    this.restaurantName = '';
    this.restaurantId = -1;
    this.address = new Address();
    this.orderForCreation = new OrderForCreation();
    this.totalPrice = -1;
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

    // if there is an address, recalculate the total price
    if(this.checkAddressValidity()) {
      this.calculateTotalPrice();
    }
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

    // if there is an address, recalculate the total price
    if(this.checkAddressValidity()) {
      this.calculateTotalPrice();
    }
  }

  getOrderValue() {
    let orderValue = 0;
    for (const key in this.cartItems) {
      orderValue += this.cartItems[key].amount * this.cartItems[key].menuItemPrice;
    }
    return orderValue;
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

  checkAddressValidity() {
    if (this.address.street && 
        this.address.city && 
        this.address.zipcode && 
        this.address.gpsLatitude && 
        this.address.streetNumber &&
        this.address.gpsLatitude <= 90 && this.address.gpsLatitude >= -90 &&
        this.address.gpsLongitude
        && this.address.gpsLongitude <= 180 && this.address.gpsLongitude >= -180) {
      return true;
    } else {
      return false;
    }
  }

  calculateTotalPrice() {
    if(!this.checkAddressValidity()) {
      alert('Address is invalid');
      return;
    }

    // get the ordered items 
    let orderedItems: OrderedItem[] = [];
    for (const key in this.cartItems) {
      orderedItems.push(new OrderedItem(this.cartItems[key].menuItemId, this.cartItems[key].amount));
    }

    // create the price calculation object
    const priceCalculation = new PriceCalculation(this.restaurantId, this.address, orderedItems);

    this.snacksService.calculateTotalPrice(priceCalculation).subscribe((res: number) => {
      alert('Total price: ' + res);
      this.totalPrice = res;
    });

  }

  placeOrder() {
    if(!this.checkAddressValidity()) {
      alert('Address is invalid');
      return;
    }

    // check if the customer name and phone number are set
    if(this.orderForCreation.customerName && this.orderForCreation.phoneNumber) {
      this.disableOrderButton = true;

      // get the ordered items 
      let orderedItems: OrderedItem[] = [];
      for (const key in this.cartItems) {
        orderedItems.push(new OrderedItem(this.cartItems[key].menuItemId, this.cartItems[key].amount));
      }

      // create the post order object
      this.orderForCreation.restaurantId = this.restaurantId;
      const postOrder = new PostOrder(this.orderForCreation, this.address, orderedItems);

      console.log(JSON.stringify(postOrder));

      this.snacksService.postOrder(postOrder).subscribe((res: any) => {

        if(res === null) {
          this.disableOrderButton = false;
          return;
        } else {
          alert('Order placed successfully');
          console.log(res["orderId"]);
          
          // store the order id in the local storage
          const existingOrders = JSON.parse(localStorage.getItem('wea5-orders') || '[]');
          existingOrders.push(res["orderId"]);
          localStorage.setItem('wea5-orders', JSON.stringify(existingOrders));

          this.clearCart();
          
        }

        this.disableOrderButton = false;

      }); 



      
    } else {
      alert('Please enter your name and phone number');
    }





  }

}
