import { Room } from './../Interface/room';
import { HotelService } from './../services/hotel.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContractService } from '../services/contract.service';
import { Contract } from '../Interface/contract';
import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from '../Interface/hotel';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  faplus = faPlus;

  public contracts: Contract[];
  public hotels: Hotel[];

  room1: Room = {
    roomType: "AC",
    price: 25000,
    noOfRooms: 7,
    availableRooms: 6,
    maxAdults: 5,
    id: 1,
    contract: undefined
  }

  public rooms: Room[]=[this.room1];

  constructor(private contractService: ContractService, private hotelService: HotelService) {}

  ngOnInit() {
    this.getContracts();
    this.getHotels();
  }

  public getContracts(): void {
    this.contractService.getContracts().subscribe(
      {
        next:(response: Contract[]) => {
          this.contracts = response;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      {
        next:(response: Hotel[]) => {
          this.hotels = response;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
  public deleteContract(id: number): void{
    this.contractService.deleteContract(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getContracts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}