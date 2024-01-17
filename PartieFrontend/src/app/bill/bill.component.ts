import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Bill, Customer} from "../models/model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../services/customer.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent implements OnInit{
  bills!: Observable<Bill[]>;
  errorMessage!: string;
  isAdding: boolean = false;
  customerForm!: FormGroup;
  customerID!: number;

  constructor(
    private http: HttpClient,
    private service: CustomerService,
    private router: Router,
    private route:ActivatedRoute
  ) { this.customerID=route.snapshot.params['customerID']}

  ngOnInit(): void {
    this.http.get("http://localhost:8888/BILLINGSERVICE/bills/search/byCustomerID?projection=fullBill&customerID=", this.customerID)
      .subscribe({
        next: (data) => {
          this.bills = data;
        },
        error: (err) => {
        }
      });
  }



  handleSaveCustomer() {

    let customer:Customer=this.customerForm.value;
    this.service.addCustomer(customer).subscribe({
      next:(data)=>{
        alert("Customer has been successfully saved!");
        this.isAdding = false;
        this.customerForm.reset();

      },
      error:err => {

        alert("We encounter an issue in saving your data !")
      }

    });

  }
  onAdd() {
    this.isAdding = true;
  }

  cancelAdd() {
    this.isAdding = false;
    this.customerForm.reset();
  }

  handleDeleteCustomer(customer: Customer) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.service.deleteCustomer(customer.id).subscribe({
      next: (resp) => {
        this.customers = this.customers.pipe(
          map(data => {
            const index = data.indexOf(customer);
            if (index !== -1) {
              data.splice(index, 1);
            }
            return data;
          })
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleUpdateCustomer() {
    if (!this.selectedCustomer) {
      alert("No customer selected for update!");
      return;
    }

    const updatedCustomer: Customer = this.customerForm.value;
    updatedCustomer.id = this.selectedCustomer.id;

    this.service.updateCustomer(updatedCustomer).subscribe({
      next: (data) => {
        alert("Customer has been successfully updated!");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.isUpdating = false;
        this.customerForm.reset();
        this.selectedCustomer = null;
        this.handleSearchCustomers();
      },
      error: (err) => {
        alert("Something went wrong during the update!");
      },
    });
  }
}
