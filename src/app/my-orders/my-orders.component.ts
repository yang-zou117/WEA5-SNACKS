import { Component } from '@angular/core';
import { SnacksServiceService } from '../shared/snacks-service.service';
import { Order } from '../shared/order';

@Component({
  selector: 'wea5-my-orders',
  templateUrl: './my-orders.component.html',
  styles: [
  ]
})
export class MyOrdersComponent {

  myOrders: Order[] = [];

  constructor(private snacksService: SnacksServiceService) { }

  ngOnInit() {
    this.loadMyOrders();
  }

  loadMyOrders() {
    // get the order ids from local storage
    const orderIds = JSON.parse(localStorage.getItem('wea5-orders') || '[]');
    for (let orderId of orderIds) {
      this.snacksService.getOrderForId(orderId).subscribe(order => {
        if (order) {
          this.myOrders.push(order);
        }
      });
    }

  }

}
