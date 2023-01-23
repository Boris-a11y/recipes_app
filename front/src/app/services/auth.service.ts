import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { httpOptions } from '../utils/httpOptions';

const apiUrl = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, password: string, age: number): Observable<any> {
    return this.http.post(
      `${apiUrl}/register`,
      { username, password, age },
      httpOptions
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${apiUrl}/login`,
      { username, password },
      httpOptions
    );
  }

  isAuthenticated(): Observable<any> {
    return this.http.get(`${apiUrl}/me`, httpOptions).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  me(): Observable<any> {
    return this.http.get(`${apiUrl}/me`, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.get(`${apiUrl}/logout`, httpOptions);
  }
}
