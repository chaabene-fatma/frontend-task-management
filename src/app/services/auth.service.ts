import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<String> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams({ email: user.email, password: user.password });
    return this.http.post<String>(`${this.apiUrl}/auth/login`, body.toString(), { headers, withCredentials: true });
  }

  register(user: User): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams({ email: user.email, password: user.password });
    return this.http.post<string>(`${this.apiUrl}/auth/register`, body.toString(), { headers });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true });
  }



}
