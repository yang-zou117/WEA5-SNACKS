import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantForCreation } from "./restaurant-for-creation";
import { Address } from "./address";
import { OpeningHours } from "./opening-hours";
import { ClosingDay } from "./closing-day";
import { RestaurantSearchResult } from "./restaurant-search-result";
import { RestaurantDetails } from "./restaurant-details";
import { DeliveryCondition } from "./delivery-condition";
import { MenuItem } from "./menu-item";
import { PriceCalculation } from "./price-calculation";
import { PostOrder } from "./post-order";


@Injectable({
    providedIn: 'root'
})
export class SnacksServiceService {
    
    constructor(private http: HttpClient) { }

    private errorHandler(error: Error | any): Observable<any> {
        alert("An error occured. Please try again later.");
        console.log(error);
        return of(null);
    } 

    private priceNotCalculatedHandler(error: Error | any): Observable<any> {
        alert("An error occured: It might be that the restaurant has no suitable delivery conditions for your address. Please try again later.");
        console.log(error);
        return of(null);
    }

    private orderNotCreatedHandler(error: Error | any): Observable<any> {
        alert("An error occured during the order process: It might be that the restaurant has no suitable delivery conditions for your address. Please try again later.");
        console.log(error);
        return of(null);
    }

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
  
        // check if image is uploaded
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
                {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).pipe(catchError(this.errorHandler));
    }

    getRestaurantsInProximity(maxDistance: number, latitude: number, 
                              longitude: number, shouldBeOpen: boolean): Observable<RestaurantSearchResult[]> {
        return this.http.get(`${environment.server}/order/findRestaurants?maxDistance=${maxDistance}&latitude=${latitude}&longitude=${longitude}&shouldBeOpen=${shouldBeOpen}`, 
                             {headers: {'Accept': 'application/json'}}).pipe(map<any, RestaurantSearchResult[]>(res => res), catchError(this.errorHandler));
    }

    getRestaurantDetails(restaurantId: number): Observable<RestaurantDetails> {
        return this.http.get(`${environment.server}/restaurant/${restaurantId}`, 
                             {headers: {'Accept': 'application/json'}}).pipe(map<any, RestaurantDetails>(res => res), catchError(this.errorHandler));
    }

    getDeliveryConditions(restaurantId: number): Observable<DeliveryCondition[]> {
        return this.http.get(`${environment.server}/deliverycondition/restaurant/${restaurantId}`, 
                             {headers: {'Accept': 'application/json'}}).pipe(map<any, DeliveryCondition[]>(res => res), catchError(this.errorHandler));
    }

    getMenuItems(restaurantId: number): Observable<MenuItem[]> {
        return this.http.get(`${environment.server}/menuitem/restaurant/${restaurantId}`, 
                             {headers: {'Accept': 'application/json'}}).pipe(map<any, MenuItem[]>(res => res), catchError(this.errorHandler));
    }

    calculateTotalPrice(priceCalculationObject: PriceCalculation): Observable<number>{
        return this.http.post(`${environment.server}/order/calculatePrice`,
                            JSON.stringify(priceCalculationObject),
                            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).pipe(map<any, number>(res => res), catchError(this.priceNotCalculatedHandler));
    }

    postOrder(postOrderObject: PostOrder): Observable<any> {
        return this.http.post(`${environment.server}/order/placeOrder`,
                            JSON.stringify(postOrderObject),
                            {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}).pipe(map<any, any>(res => res), catchError(this.orderNotCreatedHandler));
    }
    
    
    
}
