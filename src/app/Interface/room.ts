import { Contract } from "./contract";

export interface Room{
    id:number;
    contract: any;
    roomType: string;
    price: number;
    noOfRooms: number;
    availableRooms: number;
    maxAdults: number;

}