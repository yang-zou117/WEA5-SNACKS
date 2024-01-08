import { Address } from "./address";
import { ClosingDay } from "./closing-day";
import { OpeningHours } from "./opening-hours";
import { Restaurant } from "./restaurant";

export class RestaurantDetails {
    constructor(
        public restaurant: Restaurant, 
        public address: Address,
        public openingHours: OpeningHours[],
        public closingDays: ClosingDay[]
    ){}
}
