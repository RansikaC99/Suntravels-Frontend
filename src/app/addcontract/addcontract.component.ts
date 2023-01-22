import { Hotel } from './../Interface/hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contract } from '../Interface/contract';
import { Room } from '../Interface/room';
import { ContractService } from '../services/contract.service';
import { HotelService } from '../services/hotel.service';
import * as moment from 'moment-timezone';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrls: ['./addcontract.component.css']
})
export class AddcontractComponent implements OnInit {

  

  public hotels: Hotel[];

  constructor(private router: Router, private hotelService: HotelService, private contractService: ContractService, private fb: FormBuilder){}
  
  contractForm = this.fb.group({
    hotel:['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

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
  public addContract() {
    if (this.contractForm.valid) {
      this.contractForm.controls['startDate'].setValue(moment(this.contractForm.value.startDate).format('yyyy-MM-DD'));
      this.contractForm.controls['endDate'].setValue(moment(this.contractForm.value.endDate).format('yyyy-MM-DD'));
      const index =  parseInt(this.contractForm.value.hotel);
      
    //   this.contractForm.patchValue({
    //     hotel: { id: parseInt(this.contractForm.value.hotel)}
    //  });
    let contractobj: Contract = {
      id: null,
      hotel: { id: index},
      startDate: this.contractForm.value.startDate,
      endDate: this.contractForm.value.endDate,
    };
     
      
      // let { hotel, startDate, endDate } = this.contractForm.value;
      // const contract = { id: null, hotel, startDate, endDate };
      console.log(contractobj);

      this.contractService.addContract(contractobj).subscribe(
        (response: Contract) => {
          this.router.navigateByUrl('/addroom/'+response.id);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }
  }

  // public addContract(addContractForm: NgForm): void{
  //   addContractForm.controls['startDate'].setValue(moment(addContractForm.value.startDate).format('yyyy-MM-DD'));
  //   addContractForm.controls['endDate'].setValue(moment(addContractForm.value.endDate).format('yyyy-MM-DD'));
  //   addContractForm.controls['hotel'].setValue({"id": parseInt(addContractForm.value.hotel)});
  //   this.contractService.addContract(addContractForm.value).subscribe(
  //     (response: Contract) => {
  //       this.router.navigateByUrl('/addroom/'+response.id);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
}
