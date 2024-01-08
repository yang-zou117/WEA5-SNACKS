import { Component } from '@angular/core';
import { RestaurantSearchResult } from '../shared/restaurant-search-result';
import { DataSharingService } from '../shared/data-sharing-service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { RestaurantDetails } from '../shared/restaurant-details';
import { SnacksServiceService } from '../shared/snacks-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryCondition } from '../shared/delivery-condition';
import { MenuItem } from '../shared/menu-item';
import { Location } from '@angular/common';

@Component({
  selector: 'wea5-search-results',
  templateUrl: './search-results.component.html',
  styles: [
  ]
})
export class SearchResultsComponent {

  // data for showing all the restaurants in the search results
  restaurants: RestaurantSearchResult[] = [];

  // data for showing the details of a restaurant
  // key is the restaurant id and value is the restaurant details
  restaurantDetails: Record<number, RestaurantDetails> = {};
  
  // currently selected restaurant to show the details
  selectedRestaurantId: number = -1;
  deliveryConditions: DeliveryCondition[] = [];
  menuItems: MenuItem[] = [];
  

  constructor(private dataSharingService: DataSharingService, 
              private sanitizer: DomSanitizer,
              private snacksService: SnacksServiceService, 
              private location: Location) {}
  
  ngOnInit(): void {
    this.restaurants = this.dataSharingService.getSearchResults();
    this.restaurants.forEach(res => {
      let id = res.restaurant.restaurantId; 
      this.snacksService.getRestaurantDetails(id).subscribe(
        data => {
          this.restaurantDetails[id] = data;
        }
      )
    });
  }

  imageUrl(fileName: string | undefined) {
    if(fileName == undefined || fileName.trim().length == 0) {
      return '';
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.images}/${fileName}`)
  }

  showDetails(restaurantId: number) {
    this.selectedRestaurantId = restaurantId;
    this.snacksService.getDeliveryConditions(restaurantId).subscribe(
      data => {
        this.deliveryConditions = data; 
      }
    );
    this.snacksService.getMenuItems(restaurantId).subscribe(
      data => {
        this.menuItems = data; 
      }
    );
    this.location.replaceState(`/search-results/${restaurantId}`);

  }

  groupByWeekday(openingHours: any[]): any[] {
    const grouped: { [key: string]: any[] } = {};
  
    openingHours.forEach(entry => {
      if (!grouped[entry.weekDay]) {
        grouped[entry.weekDay] = [];
      }
      grouped[entry.weekDay].push(entry);
    });
  
    return Object.entries(grouped);
  }


  backToSearchResults() {
    this.selectedRestaurantId = -1;
    this.deliveryConditions = [];
    this.menuItems = [];
    this.location.replaceState(`/search-results`);
  }
  

}
