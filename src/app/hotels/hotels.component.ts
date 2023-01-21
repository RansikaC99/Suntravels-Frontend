import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Hotel } from '../Interface/hotel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  public hotels: Hotel[];

  constructor(private hotelService: HotelService){}

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
          console.log(error);
        }
      }
    );
  }
  public onAddHotel(addForm: NgForm): void{
      this.hotelService.addHotel(addForm.value).subscribe(
        (response: Hotel) => {
          console.log(response);
          this.getHotels();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public saveHotel(){
      Swal.fire(
        'Saved!',
        'Hotel has been saved successfully.',
        'success'
      )
    }
    
  }
