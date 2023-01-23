import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Room } from '../Interface/room';
import { RoomService } from '../services/room.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;
  public rooms: Room[];
  public adultList: number[] = [];
  public noAdults: number;
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
      this.adultList.push(this.noAdults);
      console.log(this.adultList);
    }
    else {
      console.log("invalid");
    }

  }

  public searchRooms() {
    this.loading = true;
    this.roomService.searchRooms(5, 8).subscribe(
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
  public deleteAdult(index: number) {
    this.adultList.splice(index, 1);
  }
}
