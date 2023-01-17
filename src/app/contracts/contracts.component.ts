import { Component } from '@angular/core';

export interface PeriodicElement {
  hotelName: string;
  startDate: string;
  endDate: string;
  view: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {hotelName: 'Green Paradise', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Dream paradise', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Saviera', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Hilton', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Grand Paradise', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Nilaroo', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
  {hotelName: 'Botanica', startDate: "19-01-2022", endDate: "19-12-2022", view: "view"},
];

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent {
  displayedColumns: string[] = ['hotel name', 'start date', 'end date', 'view'];
  dataSource = ELEMENT_DATA;
}
