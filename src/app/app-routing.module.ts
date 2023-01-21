import { AddcontractComponent } from './addcontract/addcontract.component';
import { HotelsComponent } from './hotels/hotels.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContractsComponent } from './contracts/contracts.component';
import { AddroomComponent } from './addroom/addroom.component';

const routes: Routes = [
  {path: "contracts", component: ContractsComponent},
  {path: "home", component: HomeComponent},
  {path: "hotels", component: HotelsComponent},
  {path: "addcontract", component: AddcontractComponent},
  {path: 'addroom/:id', component: AddroomComponent},
  {path:'', redirectTo:'/home', pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
