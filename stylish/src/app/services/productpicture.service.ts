import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPicture } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProductPictureService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Your API base URL

  constructor(private http: HttpClient) { }

  getProductPictures(): Observable<ProductPicture[]> {
    return this.http.get<ProductPicture[]>(`${this.apiUrl}/product-pictures/`);
  }

  getProductPicture(id: number): Observable<ProductPicture> {
    return this.http.get<ProductPicture>(`${this.apiUrl}/product-pictures/${id}/`);
  }

  createProductPicture(productPicture: ProductPicture): Observable<ProductPicture> {
    return this.http.post<ProductPicture>(`${this.apiUrl}/product-pictures/`, productPicture);
  }

  updateProductPicture(id: number, productPicture: ProductPicture): Observable<ProductPicture> {
    return this.http.put<ProductPicture>(`${this.apiUrl}/product-pictures/${id}/`, productPicture);
  }

  deleteProductPicture(id: number): Observable<ProductPicture> {
    return this.http.delete<ProductPicture>(`${this.apiUrl}/product-pictures/${id}/`);
  }

  getProductPicturesByProductId(productId: number): Observable<ProductPicture> {
    return this.http.get<ProductPicture>(`${this.apiUrl}/product-pictures/${productId}/`);
  }
}
