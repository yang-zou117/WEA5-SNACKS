import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestaurantForCreation } from "../shared/restaurant-for-creation";
import { Address } from "../shared//address";
import { OpeningHours } from "../shared//opening-hours";
import { ClosingDay } from "../shared//closing-day";
import { RestaurantSearchResult } from "../shared//restaurant-search-result";
import { RestaurantDetails } from "../shared//restaurant-details";
import { DeliveryCondition } from "../shared//delivery-condition";
import { MenuItem } from "../shared//menu-item";
import { PriceCalculation } from "../shared//price-calculation";
import { PostOrder } from "../shared//post-order";
import { Order } from "../shared//order";


@Injectable({
    providedIn: 'root'
})
export class SnacksService {
    
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
    
    getOrderForId(orderId: number): Observable<Order> {
        return this.http.get(`${environment.server}/order/${orderId}`, 
                             {headers: {'Accept': 'application/json'}}).pipe(map<any, Order>(res => res), catchError(this.errorHandler));
    }

    postNewMenuItems(menuItems: MenuItem[], restaurantId: string, apiKey: string): Observable<any> {
        return this.http.post(`${environment.server}/menuitem/restaurant/${restaurantId}`,
                               JSON.stringify(menuItems),
                               {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-API-Key': apiKey}})
                               .pipe(catchError(this.errorHandler));
    }

    deleteMenuItem(menuItemId:number, restaurantId: string, apiKey: string): Observable<any> {
        return this.http.delete(`${environment.server}/menuitem/${restaurantId}/${menuItemId}`, 
                                {headers: {'Accept': 'application/json', 'X-API-Key': apiKey}}).pipe(catchError(this.errorHandler));
    }

    updateMenuItem(menuItem: MenuItem, restaurantId: string, apiKey: string): Observable<any> {
        const menuItemToUpdate: MenuItem[] = [];
        menuItemToUpdate.push(menuItem);
        return this.http.put(`${environment.server}/menuitem/restaurant/${restaurantId}`,
                              JSON.stringify(menuItemToUpdate),
                              {headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'X-API-Key': apiKey}})
                              .pipe(catchError(this.errorHandler));
    }

    
    
}
