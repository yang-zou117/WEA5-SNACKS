export class Order {
    constructor(
        public orderId: number, 
        public restaurantId: number,
        public addressId:number, 
        public customerName: string, 
        public phoneNumber : string,
        public orderedDate: Date,
        public status: string,
        public orderCosts: number,
    ){}
}
