import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantForCreation } from "./restaurant-for-creation";
import { Address } from "./address";
import { OpeningHours } from "./opening-hours";
import { ClosingDay } from "./closing-day";

@Injectable({
    providedIn: 'root'
})
export class SnacksServiceService {
    

    registerRestaurant(restaurant: RestaurantForCreation, 
                       address: Address, 
                       openingHours: OpeningHours[], 
                       closingDays: ClosingDay[]): Observable<any> {
        // TODO 
        return of(null);
    }
}
