import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Hotel } from '../Interface/hotel';
import { HotelService } from '../services/hotel.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  public hotels: Hotel[];
  hotel_name: string;
  public loading: boolean = false;

  constructor(private hotelService: HotelService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getHotels();
  }
  hotelForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    contactNumber: ['', Validators.required],
    markup: [0, Validators.required]
  });

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
  public saveHotel(): void {
    if (this.hotelForm.valid) {
      // perform save operation
      let { name, location, contactNumber, markup } = this.hotelForm.value;
      let hotel = { id: null, name, location, contactNumber, markup};

      this.hotelService.addHotel(hotel).subscribe(
        (response: Hotel) => {
          console.log(response);
          Swal.fire(
            'Saved!',
            'Hotel has been saved successfully.',
            'success'
          )
          this.getHotels();
        },
        (error: HttpErrorResponse) => {
          Swal.fire(
            'Oops!',
            'Something went wrong',
            'error'
          )
        }
      );
    }
  }

  public searchHotel() {
    this.loading = true;
    if (this.hotel_name == undefined || this.hotel_name == '') {
      this.getHotels();
    }
    else {
      this.hotelService.searchHotel(this.hotel_name).subscribe(
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
  }

}
