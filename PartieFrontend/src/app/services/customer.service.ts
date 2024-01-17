import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Customer, CustomerResponse} from "../models/model";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiServerUrl:string='http://localhost:8888';

  constructor(private http: HttpClient) {}
  public getCustomers(): Observable<Customer[]> {
    return this.http.get<CustomerResponse>(`${this.apiServerUrl}/CUSTOMERSERVICE/customers`).pipe(
      map(response => response._embedded.customers), // Map the response to extract the customers array
      catchError((error: HttpErrorResponse) => {
        return throwError('Error getting customers: ' + error.message);
      })
    );
  }
  public deleteCustomer(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/CUSTOMERSERVICE/customers/${id}`);
  }
  public addCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.apiServerUrl}/CUSTOMERSERVICE/customers`,customer);
  }
  public updateCustomer(customer: Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.apiServerUrl}/CUSTOMERSERVICE/customers`,customer);
  }
}
