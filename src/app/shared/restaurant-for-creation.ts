export class RestaurantForCreation {
    constructor(
        public restaurantName?: string,
        public webhookUrl?: string,
        public imageFile?: File
    ) {}
}
