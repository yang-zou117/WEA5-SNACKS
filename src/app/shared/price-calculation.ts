import { Address } from "./address";
import { OrderedItem } from "./ordered-item";

export class PriceCalculation {
    constructor(
        public restaurantId: number,
        public address: Address,
        public orderedItems: OrderedItem[],
    ) {}
}
