import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://127.0.0.1:8000/api/orders';

  constructor(private http: HttpClient) { }

  // Add an order
  addOrder(userId: number, productId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${userId}/add/${productId}/`, {});
  }

  // Remove an order
  removeOrder(userId: number, orderId: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${userId}/remove/${orderId}`);
  }

  // // Get orders by user ID
  // getOrdersByUserId(userId: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiUrl}/${userId}`);
  // }

  // Get all orders
  getOrders(): Observable<Order> {
    return this.http.get<Order>(this.apiUrl);
  }

  // Get a specific order by order ID
  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // Update an existing order
  updateOrder(orderId: number, updatedData: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, updatedData);
  }

  // Delete an order
  deleteOrder(orderId: number): Observable<Order> {
    return this.http.delete<Order>(`${this.apiUrl}/${orderId}`);
  }
}
