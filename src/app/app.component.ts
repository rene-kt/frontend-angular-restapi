import { ProductService } from './../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product.model';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    @ViewChild(MatAccordion) accordion: MatAccordion;
  product = {} as Product;
  products: Product[];
  selectedProduct: Product;

  ngOnInit(): void {
    //this.getProducts();
  }

  constructor(private productService: ProductService) {}
  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }


  // Getting item from table
setClickedRow(product: Product): void{
   this.selectedProduct = product;

}

deleteItemById(): void{
  this.productService.deleteProductById(this.selectedProduct.id);
}
}
