import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../Interface/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http:HttpClient) { }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(environment.apiBaseUrl + '/rooms')
  }
  public addRooms(rooms: Room[]): Observable<Room[]>{
    return this.http.post<Room[]>(environment.apiBaseUrl + '/roomList', rooms)
  }
}
