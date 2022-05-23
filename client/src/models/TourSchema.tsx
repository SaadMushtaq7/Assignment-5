export interface TourSchema{
    _id: string;
    name: string;
    city: string;
    images: string[],
    description: string;
    price: string;
    duration:string;
    startDate: string;
    endDate:string;
    facilities: string[]
}

