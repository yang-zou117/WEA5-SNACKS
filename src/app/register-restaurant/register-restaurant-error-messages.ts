export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
}

export const RegisterRestaurantErrorMessages = [
    new ErrorMessage('restaurantName', 'required', 'A Name is required'),
    new ErrorMessage('webhookUrl', 'required', 'A webhook URL is required'),
    new ErrorMessage('street', 'required', 'A street is required'),
    new ErrorMessage('streetNumber', 'required', 'A street number is required'),
    new ErrorMessage('zipCode', 'required', 'A zip code is required'),
    new ErrorMessage('city', 'required', 'A city is required'),
    new ErrorMessage('latitude', 'required', 'A latitude is required'),
    new ErrorMessage('latitude', 'min', 'The latitude must be between -90 and 90'),
    new ErrorMessage('latitude', 'max', 'The latitude must be between -90 and 90'),
    new ErrorMessage('longitude', 'required', 'A longitude is required'),
    new ErrorMessage('longitude', 'min', 'The longitude must be between -180 and 180'),
    new ErrorMessage('longitude', 'max', 'The longitude must be between -180 and 180'),
    new ErrorMessage('startTime', 'required', 'A start time for opening hours is required'),
    new ErrorMessage('endTime', 'required', 'A end time for opening hours is required'),
    new ErrorMessage('weekDayOpeningHours', 'required', 'A day for opening hours is required'),
    new ErrorMessage('weekDayClosingDay', 'required', 'A day for closing day is required'),
]; 