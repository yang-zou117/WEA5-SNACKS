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
        
        for(let i = 0; i < openingHours.length; i++) {
            openingHours[i].startTime = openingHours[i].startTime + ":00";
            openingHours[i].endTime = openingHours[i].endTime + ":00";
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

    
}
