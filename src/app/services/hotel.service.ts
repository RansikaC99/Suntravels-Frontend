import { environment } from './../../environments/environment';
import { Hotel } from '../Interface/hotel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(environment.apiBaseUrl + '/hotels')
  }

  public addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(environment.apiBaseUrl + '/hotels', hotel)
  }
  public getHotelById(id: number): Observable<Hotel>{
    return this.http.get<Hotel>(`${environment.apiBaseUrl}/hotels/${id}`)
  }
}
