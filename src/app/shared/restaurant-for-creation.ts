export class RestaurantForCreation {
    constructor(
        public restaurantName?: string,
        public webhookUrl?: string,
        public imageData?: string,
        public fileType?: string
    ) {}
}
