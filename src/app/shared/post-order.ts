import { Address } from "./address";
import { OrderForCreation } from "./order-for-creation";
import { OrderedItem } from "./ordered-item";

export class PostOrder {
    constructor(
        public order: OrderForCreation,
        public deliveryAddress: Address,
        public orderedItems: OrderedItem[]
    ) {}
}
