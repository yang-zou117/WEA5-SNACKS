import { Component } from '@angular/core';
import { RestaurantSearchResult } from '../shared/restaurant-search-result';
import { DataSharingService } from '../shared/data-sharing-service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wea5-search-results',
  templateUrl: './search-results.component.html',
  styles: [
  ]
})
export class SearchResultsComponent {

  restaurants: RestaurantSearchResult[] = [];
  

  constructor(private dataSharingService: DataSharingService, 
              private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.restaurants = this.dataSharingService.getSearchResults();
  }

  imageUrl(fileName: string | undefined) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.images}/${fileName}`)
  }

}
