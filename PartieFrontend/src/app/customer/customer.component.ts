// components/customer.component.ts
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from "rxjs";
import { Customer } from "../models/model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CustomerService } from "../services/customer.service";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import {map} from "rxjs/operators";
import {ShowOnDirtyErrorStateMatcher} from "@angular/material/core";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers!: Observable<Customer[]>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  addBtn= true;
  isAdding: boolean = false;
  isUpdating: boolean = false;
  customerForm!: FormGroup;
  selectedCustomer: Customer | null = null;

  constructor(
    private customerFormC: MatDialog,
    private service: CustomerService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.handleSearchCustomers();

    this.customerForm=this.fb.group({
      name:this.fb.control(null,[Validators.required]),
      email:this.fb.control(null,[Validators.required])
    });
  }


  handleSearchCustomers() {
    this.customers = this.service.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
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

  onUpdate(customer: Customer) {
    this.isUpdating = true;
    this.selectedCustomer = customer;
    this.customerForm.patchValue({
      name: customer.name,
      email: customer.email,
    });
  }

  onCancelUpdate() {
    this.isUpdating = false;
    this.selectedCustomer = null;
    this.customerForm.reset();
  }

}
