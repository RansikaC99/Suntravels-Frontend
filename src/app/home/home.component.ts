import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {MatDialog} from '@angular/material/dialog';
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

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.getRooms();
  }

  public getRooms(): void {
    this.roomService.getRooms().subscribe(
      {
        next:(response: Room[]) => {
          this.rooms = response;
        },
        error:(error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
}
