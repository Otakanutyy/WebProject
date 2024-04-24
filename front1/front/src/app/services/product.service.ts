import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Order, ProductPicture, Category } from '../models';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  //product itself
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  addProduct(name:string, description:string, price:number, brand:string, category:number): Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/products/create/`, {name, description, price, brand, category});
  }


  getProduct(pk: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${pk}/`);
  }

  getProductbyOwner():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products/byOwner/`)
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}/`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/by-category/${categoryId}/`);
  }

  //categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }
  addCategory(name:string, description: string): Observable<Category>{
      return this.http.post<Category>(`${this.apiUrl}/categories/`, {name,description})
  }
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}/`);
  }

  //product picture
  getProductPicturesByProductId(product_id: number): Observable<ProductPicture> {
    return this.http.get<ProductPicture>(`${this.apiUrl}/product-pictures-by-product/${product_id}/`);
  }

  addProducPicture(product:number, front_view: File, back_view: File, side_view: File): Observable<ProductPicture>{
    return this.http.post<ProductPicture>(`${this.apiUrl}/product-pictures/`, {product, front_view, back_view, side_view});
  }

  getTopRatedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/top-rated/`);
  }

  // verifyProduct(pk: number): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/products/${pk}/verify/`, {pk});
  // }

  
  
}
