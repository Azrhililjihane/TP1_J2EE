import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BillComponent} from "./bill/bill.component";
import {ProductComponent} from "./product/product.component";
import {CustomerComponent} from "./customer/customer.component";

const routes: Routes = [
      {path:"bills",component : BillComponent},
      {path:"products",component : ProductComponent},
      {path:"customers",component : CustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
