import { Room } from './../Interface/room';
import { HotelService } from './../services/hotel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContractService } from '../services/contract.service';
import { Contract } from '../Interface/contract';
import { HttpErrorResponse } from '@angular/common/http';
import { Hotel } from '../Interface/hotel';
import { MatInput } from '@angular/material/input';
import Swal from 'sweetalert2';

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
  public loading: boolean = false;

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
    this.loading = true;
    this.hotelService.getHotels().subscribe(
      {
        next: (response: Hotel[]) => {
          this.hotels = response;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
  public deleteContract(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the contract from system",
      icon: 'question',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.contractService.deleteContract(id).subscribe(
          (response: void) => {
            this.getContracts();
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
    
  }

  public searchContract() {
    this.loading = true;
    if (this.hotelName == undefined) {
      this.getContracts();
    }
    else {
      this.contractService.searchContract(this.hotelName).subscribe(
        {
          next: (response: Contract[]) => {
            this.contracts = response;
            this.loading = false;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        }
      );
    }
  }
}