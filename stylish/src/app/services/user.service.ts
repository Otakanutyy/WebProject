import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {CustomUser} from '../models';

import { Token } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private loggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable <Token>{
    return this.http.post<Token>(
      `${this.apiUrl}/login/`,
      {username, password}
    );
  }


  getUsers(): Observable<CustomUser[]> {
    return this.http.get<CustomUser[]>(`${this.apiUrl}/users/`);
  }

  getUser(id: number): Observable<CustomUser> {
    return this.http.get<CustomUser>(`${this.apiUrl}/users/${id}/`);
  }

  createUser(user: CustomUser): Observable<CustomUser> {
    return this.http.post<CustomUser>(`${this.apiUrl}/users/`, user);
  }

  updateUser(id: number, user: CustomUser): Observable<CustomUser> {
    return this.http.put<CustomUser>(`${this.apiUrl}/users/${id}/`, user);
  }

  deleteUser(id: number): Observable<CustomUser> {
    return this.http.delete<CustomUser>(`${this.apiUrl}/users/${id}/`);
  }
}
