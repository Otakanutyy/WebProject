import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/orders/';
  cart: number[]=[];

  constructor(private http: HttpClient) { }

  addtoCart(productId: number){
    this.cart.push(productId);
  }

  addOrder(): Observable<Order> {
      return this.http.post<Order>(this.apiUrl, { products: this.cart }).pipe(
        catchError(error => {
          return throwError('Failed to add order');
        })
      );
  }

  getCart(){
    return this.cart;
  }

  clearCart(){
    this.cart = [];
  }
}
