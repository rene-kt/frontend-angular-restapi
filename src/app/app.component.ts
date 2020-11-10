import { ProductService } from './../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product.model';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(''),
    quantity: new FormControl(''),
  });

  @ViewChild(MatAccordion) accordion: MatAccordion;
  product = {} as Product;
  products: Product[];
  selectedProduct: Product;


  ngOnInit(): void {
    this.getProducts();
  }

  constructor(
    private productService: ProductService, private formBuilder: FormBuilder
  ) {

    this.productForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
      }
    );


  }
  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  // Getting item from table
  setClickedRow(product: Product): void {
    this.selectedProduct = product;
  }

  

  insertProduct(): void {
    this.product.name = this.productForm.value.name;
    this.product.value = this.productForm.value.value;
    this.product.quantity = this.productForm.value.quantity;

    this.productService.saveProduct(this.product).subscribe(() => {
      this.getProducts();
    }
    );
  }

  deleteItemById(): void {
    this.productService.deleteProductById(this.selectedProduct.id).subscribe(() => {

      this.getProducts();
    }
    
    );
  }
}
