import { Restaurant } from "./restaurant";

export class RestaurantSearchResult {
    constructor(
        public restaurant: Restaurant,
        public distance: number
    ) {}
}
