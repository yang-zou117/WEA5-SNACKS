export class MenuItem {
    constructor(
        public menuItemId?: number,
        public restaurantId?: number,
        public menuItemName?: string, 
        public menuItemDescription?: string,
        public price?: number, 
        public categoryName?: string
    ) {}
}
