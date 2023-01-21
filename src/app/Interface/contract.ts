import { Hotel } from "./hotel";
import { Room } from "./room";

export interface Contract{
    id:number;
    hotel: Hotel;
    startDate: string;
    endDate: string;
}