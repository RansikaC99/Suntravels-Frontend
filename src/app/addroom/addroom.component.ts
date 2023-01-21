import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router){
    this.contractId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
  public rooms: Room[]=[];

  public addRoom(addForm: NgForm): void{
    addForm.controls['contract'].setValue({"id": this.contractId});
    this.rooms.push(addForm.value);
    
  }
  public deleteRoom(index: number){
    this.rooms.splice(index,1);
  }
  public addRoomsToContract(){
    this.roomService.addRooms(this.rooms).subscribe(
      (response: Room[]) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
  }

}
