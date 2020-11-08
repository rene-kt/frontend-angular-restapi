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
export class ServiceService {
  apiUrl = 'http://localhost:300/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}


  getProductsById(id: string): Observable<Product>{
    return this.httpClient.get<Product>(this.apiUrl + '/' + id);
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, JSON.stringify(product), this.httpOptions);
  }

  updateProduct(product: Product): Observable<Product>{
    return this.httpClient.put<Product>(this.apiUrl,JSON.stringify(product),this.httpOptions);
  }

  deleteProductById(id: string): any{
    return this.httpClient.delete<Product>(this.apiUrl + '/' + id, this.httpOptions);
  }
}
