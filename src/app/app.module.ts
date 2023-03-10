import { HotelService } from './services/hotel.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ContractsComponent } from './contracts/contracts.component';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HotelsComponent } from './hotels/hotels.component';
import { HttpClientModule } from '@angular/common/http';
import { ContractService } from './services/contract.service';
import { AddcontractComponent } from './addcontract/addcontract.component';
import { AddroomComponent } from './addroom/addroom.component';
import { RoomService } from './services/room.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContractsComponent,
    HotelsComponent,
    AddcontractComponent,
    AddroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, HotelService, ContractService, RoomService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
