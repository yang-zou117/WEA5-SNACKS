export class OpeningHours {
    constructor(
        public openingHoursId?: number,
        public weekDay?: string,
        public startTime?: string, 
        public endTime?: string,
        public restaurantId?: number
    ) {}
}
