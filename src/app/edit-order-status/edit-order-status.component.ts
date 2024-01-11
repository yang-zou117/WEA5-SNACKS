import { Component } from '@angular/core';
import { SnacksService } from '../services/snacks-service.service';
import { Order } from '../shared/order';
import { AuthenticationService } from '../services/authentication-service.service';
import { OrderStatus } from '../shared/order-status';

@Component({
  selector: 'wea5-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styles: [
  ]
})
export class EditOrderStatusComponent {

  myOrders: Order[] = []
  successMessage: string = "";

  constructor(private snacksService: SnacksService, 
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.loadMyOrders();
  }

  loadMyOrders() {
    const restaurantId = this.auth.getUsernameFromToken();
    const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
    const apiKey = apiKeys[restaurantId];

    this.snacksService.getAllOrdersForRestaurant(restaurantId, apiKey).subscribe(
      (data) => {
        this.myOrders = data;
      }
    );
  }

  updateOrderStatus(order: Order){
    if(!order.orderId || !order.status) {
      alert("Please select an order and a status!");
      return;
    }
    this.successMessage = "";

    const restaurantId = this.auth.getUsernameFromToken();
    const apiKeys = JSON.parse(localStorage.getItem('wea5-api-keys') || '{}');
    const apiKey = apiKeys[restaurantId];

    const newStatus = new OrderStatus(order.status);

    this.snacksService.updateOrderStatus(order.orderId, newStatus, restaurantId, apiKey).subscribe(
      (data) => {
        this.successMessage = "Order status successfully updated!";
        this.loadMyOrders();
      }
    );

  }

}
