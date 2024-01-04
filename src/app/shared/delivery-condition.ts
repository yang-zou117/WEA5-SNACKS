export class DeliveryCondition {
    constructor(
        public deliveryConditionId?: number,
        public restaurantId?: number,
        public distanceLowerThreshold?: number,
        public distanceUpperThreshold?: number,
        public orderValueLowerThreshold?: number,
        public orderValueUpperThreshold?: number,
        public deliveryCosts?: number,
        public minOrderValue?: number
    ){}
}
