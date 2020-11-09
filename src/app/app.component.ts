import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  product = {} as Product;
  products: Product[];
  selectedProduct: Product;

  ngOnInit(): void {
    this.getProducts();
  }

  constructor(private productService: ProductService) {}
  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }
  //Getting item from table
setClickedRow(product: Product): void{
   this.selectedProduct = product;
   console.log(product);
}
}
