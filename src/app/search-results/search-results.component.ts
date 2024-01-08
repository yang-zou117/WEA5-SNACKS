import { Component } from '@angular/core';
import { RestaurantSearchResult } from '../shared/restaurant-search-result';
import { DataSharingService } from '../shared/data-sharing-service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { RestaurantDetails } from '../shared/restaurant-details';
import { SnacksServiceService } from '../shared/snacks-service.service';

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
  

  constructor(private dataSharingService: DataSharingService, 
              private sanitizer: DomSanitizer,
              private snacksService: SnacksServiceService) {}
  
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
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.images}/${fileName}`)
  }

  showDetails(restaurantId: number) {
    this.selectedRestaurantId = restaurantId;
    console.log(this.restaurantDetails[restaurantId]);


  }

}
