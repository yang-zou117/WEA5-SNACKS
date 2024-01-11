import { Component } from '@angular/core';
import { SnacksService } from '../services/snacks-service.service';
import { MenuItem } from '../shared/menu-item';

@Component({
  selector: 'wea5-edit-menu',
  templateUrl: './edit-menu.component.html',
  styles: [
  ]
})
export class EditMenuComponent {

  existingItems: MenuItem[] = []
  newItems: MenuItem[] = []

  constructor(private snacksService: SnacksService) { }

}
