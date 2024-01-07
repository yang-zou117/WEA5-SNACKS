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
    
    constructor(private http: HttpClient) { }

    registerRestaurant(restaurant: RestaurantForCreation, 
                       address: Address, 
                       openingHours: OpeningHours[], 
                       closingDays: ClosingDay[]): Observable<any> {
        
        // compute values for closing days 
        // better approach is to use triggers in the database but during the implementation of Backend, it was not done
        const weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for(let weekDay of weekdays) {
            let found = false;
            for(let entry of openingHours) {
            if(entry.weekDay === weekDay) {
                found = true;
                break;
            }
            }
            if(!found) {
                closingDays.push(new ClosingDay(weekDay));
            }
        }
  
  
        let restaurantObject: any = {};
        if(restaurant.imageData !== undefined && restaurant.fileType !== undefined) {
            restaurantObject = {
                "restaurantName": restaurant.restaurantName,
                "webhookUrl": restaurant.webhookUrl,
                "image": {
                    "imageData": restaurant.imageData,
                    "fileType": restaurant.fileType
                },
            };
        } else {
            restaurantObject = {
                "restaurantName": restaurant.restaurantName,
                "webhookUrl": restaurant.webhookUrl
            };
        }


        const registerObject = {
            "restaurant": restaurantObject,
            "address": address,
            "openingHours": openingHours,
            "closingDays": closingDays
        };
        

        console.log(JSON.stringify(registerObject));
        return this.http.post(`${environment.server}/restaurant/register`, 
                              JSON.stringify(registerObject), 
                              {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}});
    }

    getRestaurantsInProximity(maxDistance: number, latitude: number, 
                              longitude: number, shouldBeOpen: boolean): Observable<any> {
        return this.http.get(`${environment.server}/order/findRestaurants??maxDistance=${maxDistance}&latitude=${latitude}&longitude=${longitude}&shouldBeOpen=${shouldBeOpen}`, 
                             {headers: {'Accept': 'application/json'}});
    }

    
}
