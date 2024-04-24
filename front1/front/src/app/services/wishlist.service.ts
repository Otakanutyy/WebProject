import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductPicture, Category, Wishlist } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://127.0.0.1:8000/api/wishlists/';

  constructor(private http: HttpClient) { }

  getWishlists():Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>('http://127.0.0.1:8000/api/wishlists/');
  }

  getWishlist():Observable<Wishlist>{
    return this.http.get<Wishlist>('http://127.0.0.1:8000/api/wishlist/byUser/');
  }

  addToWishlist(product_id: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.apiUrl}addProduct/${product_id}/`, {});
  }

  updateWishlist(wish: Wishlist): Observable<Wishlist>{
    return this.http.put<Wishlist>('http://127.0.0.1:8000/api/wishlist/byUser/', {wish});
  }
}
