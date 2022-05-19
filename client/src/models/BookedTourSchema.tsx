import { TourSchema } from "./TourSchema";

export interface BookedTourSchema{
    _id:string;
    name:string;
    email:string;
    phoneNo:string;
    numOfAdults:string;
    numOfChilds:string;
    paymentMethod:string;
    tours:TourSchema;
}