import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Product, ProductResponse} from "../models/model";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiServerUrl:string='http://localhost:8888';

  constructor(private http: HttpClient) {}
  public getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(`${this.apiServerUrl}/PRODUCTSERVICE/products`).pipe(
      map(response => response._embedded.products),
      catchError((error: HttpErrorResponse) => {
        return throwError('Error getting products: ' + error.message);
      })
    );
  }
  public deleteProduct(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/PRODUCTSERVICE/products/${id}`);
  }
  public addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiServerUrl}/PRODUCTSERVICE/products`,product);
  }
  public updateProduct(product: Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiServerUrl}/PRODUCTSERVICE/products`,product);
  }
}
