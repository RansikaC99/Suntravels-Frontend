import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Room } from '../Interface/room';
import { RoomService } from '../services/room.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';

class RoomDetails {
  adults: number;
  rooms: number;

  constructor(adults: number, rooms: number) {
      this.adults = adults;
      this.rooms = rooms;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;
  public rooms: Room[];
  public adultList: RoomDetails[] = [];
  public noAdults: number=1;
  public noNights: number=1;
  public noRooms: number=1;
  public checkin_date: string;
  public loading: boolean = false;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRooms();
  }

  public getRooms(): void {
    this.loading = true;
    this.roomService.getRooms().subscribe(
      {
        next: (response: Room[]) => {
          this.rooms = response;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
  public addRoomDetails() {
    if (this.noAdults != undefined) {
      let roomData= new RoomDetails(this.noAdults, this.noRooms);
      this.adultList.push(roomData);
      console.log(this.adultList);
    }
    else {
      console.log("invalid");
    }

  }

  public searchRooms() {
    if(this.adultList.length !==0){
      this.loading = true;
      this.rooms.splice(0);
      this.adultList.forEach( (element) => {
        this.roomService.searchRooms(moment(this.checkin_date).format('yyyy-MM-DD'), element.adults).subscribe(
          {
            next: (response: Room[]) => {
              response.forEach( (room) => {
                room.price=room.price*element.adults*room.contract.hotel.markup*this.noNights;
                this.rooms.push(room);
            });
              this.loading = false;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          }
        );
      });
    }
    else{
      this.getRooms();
    }
    
  }
  public deleteAdult(index: number) {
    this.adultList.splice(index, 1);
  }
}
