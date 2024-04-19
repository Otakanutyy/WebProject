import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'http://127.0.0.1:8000/api/comments';

  constructor(private http: HttpClient) { }

  // Add a comment to a product
  addCommentToProduct(productId: number, userId: number, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}?product_id=${productId}`, { user_id: userId, text });
  }

  // Get comments by product ID
  getCommentsByProductId(productId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}?product_id=${productId}`);
  }

  // Get all comments
  getComments(): Observable<Comment> {
    return this.http.get<Comment>(this.apiUrl);
  }

  // Get a specific comment by comment ID
  getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${commentId}`);
  }

  // Update an existing comment
  updateComment(commentId: number, updatedData: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${commentId}`, updatedData);
  }

  // Delete a comment
  deleteComment(commentId: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiUrl}/${commentId}`);
  }
}
