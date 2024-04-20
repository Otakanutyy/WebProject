import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { User, Token } from '../models';
import {  Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable <Token>{
    return this.http.post<Token>(
      `${this.apiUrl}/login/`,
      {username, password}
    );
  }
}
