import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { newOrder } from '../models';
import { OrderItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/orders';
  cart: number[]=[];
  orderId: number|undefined;

  constructor(private http: HttpClient) { }

  addtoCart(productId: number){
    this.cart.push(productId);
  }

  addOrder(): Observable<newOrder> {
      return this.http.post<newOrder>(this.apiUrl, {}).pipe(
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
