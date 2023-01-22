import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from '../Interface/contract';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http:HttpClient) { }

  public getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(environment.apiBaseUrl + '/contracts')
  }
  public addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(environment.apiBaseUrl + '/contracts', contract)
  }
  public deleteContract(id: number): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + '/contracts/'+`${id}`)
  }
  public searchContract(hotelName: string): Observable<Contract[]> {
    return this.http.get<Contract[]>(environment.apiBaseUrl + '/contracts/' +`search?name=${hotelName}`)
  }
}
