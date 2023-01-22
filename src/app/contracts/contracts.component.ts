import { Room } from './../Interface/room';
import { HotelService } from './../services/hotel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContractService } from '../services/contract.service';
import { Contract } from '../Interface/contract';
import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from '../Interface/hotel';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  hotelName: string;

  faplus = faPlus;

  public contracts: Contract[];
  public hotels: Hotel[];

  constructor(private contractService: ContractService, private hotelService: HotelService) { }

  ngOnInit() {
    this.getContracts();
    this.getHotels();
  }

  public getContracts(): void {
    this.contractService.getContracts().subscribe(
      {
        next: (response: Contract[]) => {
          this.contracts = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      {
        next: (response: Hotel[]) => {
          this.hotels = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
  public deleteContract(id: number): void {
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

  public searchContract() {
    if (this.hotelName == undefined) {
      this.getContracts();
    }
    else {
      this.contractService.searchContract(this.hotelName).subscribe(
        {
          next: (response: Contract[]) => {
            this.contracts = response;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        }
      );
    }
  }
}