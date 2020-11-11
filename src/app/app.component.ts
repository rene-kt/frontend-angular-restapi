import { ProductService } from './../services/product.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product.model';
import { MatAccordion } from '@angular/material/expansion';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  editMode: boolean;
  selectedProduct = {} as Product;

  ngOnInit(): void {
    this.getProducts();
    this.editMode = false;
  }

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }
  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  insertProduct(): void {
    this.product.name = this.productForm.value.name;
    this.product.value = this.productForm.value.value;
    this.product.quantity = this.productForm.value.quantity;

    this.productService.saveProduct(this.product).subscribe(() => {
      this.getProducts();
      this.productForm.reset();
    });
  }

  updateItem(): void {
    this.selectedProduct.id = this.selectedProduct.id;

    if (this.productForm.value.name !== '') {
      this.selectedProduct.name = this.productForm.value.name;
    }

    if (this.productForm.value.value !== '') {
      this.selectedProduct.value = this.productForm.value.value;
    }

    if (this.productForm.value.quantity !== '') {
      this.selectedProduct.quantity = this.productForm.value.quantity;
    }

    this.productService.updateProduct(this.selectedProduct).subscribe(() => {
      this.editMode = false;
      this.productForm.reset();
    });
  }

  deleteItemById(product: Product): void {
    this.selectedProduct = product;
    this.productService
      .deleteProductById(this.selectedProduct.id)
      .subscribe(() => {
        this.getProducts();
        this.productForm.reset();
      });
  }

  changeEditMode(condition: boolean, product: Product): void {
    this.editMode = condition;
    this.selectedProduct = product;

    if(condition === false){
      this.selectedProduct.name = '';
    }
  }
}
