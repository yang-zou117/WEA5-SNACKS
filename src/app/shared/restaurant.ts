export class Restaurant {
    constructor(
        public restaurantId?: number,
        public restaurantName?: string,
        public webhookUrl?: string,
        public imagePath?: string,
        public addressId?: number,
    ) {}
}
