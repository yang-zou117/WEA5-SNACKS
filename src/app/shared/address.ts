export class Address {
    constructor(
        public addressId?: number,
        public street?: string,
        public streetNumber?: string, 
        public city?: string,
        public zipCode?: number,
        public latitude?: number,
        public longitude?: number,
        public free_text?: string
    ) {}
}
