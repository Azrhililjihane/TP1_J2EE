import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../models/model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products!: Observable<Product[]>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;
  isAdding: boolean = false;
  productForm!: FormGroup;


  constructor(
    private productFormC: MatDialog,
    private service: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.handleSearchProducts();

    this.productForm=this.fb.group({
      name:this.fb.control(null,[Validators.required]),
      price:this.fb.control(null,[Validators.required]),
      quantity:this.fb.control(null,[Validators.required])

    });
  }


  handleSearchProducts() {
    this.products = this.service.getProducts().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleSaveProduct() {

    let product:Product=this.productForm.value;
    this.service.addProduct(product).subscribe({
      next:(data)=>{
        alert("Product has been successfully saved!");
        this.isAdding = false;
        this.productForm.reset();

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
    this.productForm.reset();
  }

  handleDeleteProduct(product: Product) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.service.deleteProduct(product.id).subscribe({
      next: (resp) => {
        this.products = this.products.pipe(
          map(data => {
            const index = data.indexOf(product);
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

}
