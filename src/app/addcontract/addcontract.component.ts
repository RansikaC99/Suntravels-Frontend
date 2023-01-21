import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Contract } from '../Interface/contract';
import { Hotel } from '../Interface/hotel';
import { Room } from '../Interface/room';
import { ContractService } from '../services/contract.service';
import { HotelService } from '../services/hotel.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrls: ['./addcontract.component.css']
})
export class AddcontractComponent implements OnInit {

  public hotels: Hotel[];

  constructor(private router: Router, private hotelService: HotelService, private contractService: ContractService){}

  ngOnInit() {
    this.getHotels();
  }

  public getHotels(): void {
    this.hotelService.getHotels().subscribe(
      {
        next:(response: Hotel[]) => {
          this.hotels = response;
        },
        error:(error: HttpErrorResponse) => {
        }
      }
    );
  }

  public addContract(addContractForm: NgForm): void{
    addContractForm.controls['startDate'].setValue(moment(addContractForm.value.startDate).format('yyyy-MM-DD'));
    addContractForm.controls['endDate'].setValue(moment(addContractForm.value.endDate).format('yyyy-MM-DD'));
    addContractForm.controls['hotel'].setValue({"id": parseInt(addContractForm.value.hotel)});
    this.contractService.addContract(addContractForm.value).subscribe(
      (response: Contract) => {
        this.router.navigateByUrl('/addroom/'+response.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
