import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Room } from '../Interface/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {
  private contractId: string;
  roomForm: FormGroup;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router, private formBuilder: FormBuilder) {
    this.contractId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      roomType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      noOfRooms: ['', [Validators.required, Validators.min(0)]],
      availableRooms: ['', [Validators.required, Validators.min(0)]],
      maxAdults: ['', [Validators.required, Validators.min(0)]]
    });
  }
  public rooms: Room[] = [];

  public addRooms() {
    if (this.roomForm.valid) {
      let roomobj: Room = {
        id: null,
        contract: { id: parseInt(this.contractId) },
        roomType: this.roomForm.value.roomType,
        price: this.roomForm.value.price,
        noOfRooms: this.roomForm.value.noOfRooms,
        availableRooms: this.roomForm.value.availableRooms,
        maxAdults: this.roomForm.value.maxAdults
      };
      this.rooms.push(roomobj);
    }
  }
  public deleteRoom(index: number) {
    this.rooms.splice(index, 1);
  }
  public addRoomsToContract() {
    this.roomService.addRooms(this.rooms).subscribe(
      (response: Room[]) => {
        console.log(response);
        Swal.fire({
          title: 'Saved',
          text: "Contract has been saved successfully",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(["/contracts"]);
          }
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
