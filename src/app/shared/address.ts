export class Address {
    constructor(
        public addressId?: number,
        public street?: string,
        public streetNumber?: string, 
        public city?: string,
        public zipcode?: number,
        public gpsLatitude?: number,
        public gpsLongitude?: number,
        public free_text?: string
    ) {}
}
