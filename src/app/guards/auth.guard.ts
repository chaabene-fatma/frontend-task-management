import {CanActivate, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/auth/verify`, { withCredentials: true }).pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

