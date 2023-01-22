import { Hotel } from "./hotel";
import { Room } from "./room";

export interface Contract{
    id:number;
    hotel: any;
    startDate: string;
    endDate: string;
}