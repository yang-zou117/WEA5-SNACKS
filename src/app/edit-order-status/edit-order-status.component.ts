import { Component } from '@angular/core';
import { SnacksService } from '../services/snacks-service.service';
import { Order } from '../shared/order';

@Component({
  selector: 'wea5-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styles: [
  ]
})
export class EditOrderStatusComponent {

  myOrders: Order[] = []

  constructor(private snacksService: SnacksService) { }

}
