import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wishlist } from '../models';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Retrieve wishlist by user ID
  getWishlistByUserId(userId: number): Observable<Wishlist> {
    return this.http.get<Wishlist>(`${this.apiUrl}/wishlist/${userId}/`);
  }

  // Add product to wishlist
  addToWishlist(userId: number, productId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.apiUrl}/wishlist/${userId}/add/${productId}/`, {});
  }

  // Other wishlist-related methods can be added here
}
