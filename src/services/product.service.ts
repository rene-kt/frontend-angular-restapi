import { Product } from './../models/product.model';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  constructor(private httpClient: HttpClient) {}

  getProductsById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + '/product/' + id);
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl + '/products');
  }

  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      this.apiUrl + '/product',
      JSON.stringify(product),
      this.httpOptions
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      this.apiUrl + '/product',
      JSON.stringify(product),
      this.httpOptions
    );
  }

  deleteProductById(id: number): any {
    return this.httpClient.delete<Product>(
      this.apiUrl + '/product/' + id,
      this.httpOptions
    );
  }
}
