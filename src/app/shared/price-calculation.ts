import { Address } from "./address";
import { OrderedItem } from "./ordered-item";

export class PriceCalculation {
    constructor(
        public restaurantId: number,
        public deliveryAddress: Address,
        public orderedItems: OrderedItem[],
    ) {}
}
