import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Logout {
   private apiUrl = 'https://round8-backend-team-one.huma-volve.com/api/profile/logout'; // replace {{cure}} with your base URL

  constructor(private http: HttpClient) { }
// new
  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // assuming you store JWT token in localStorage

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // send token to API
    });

    return this.http.post(this.apiUrl, {}, { headers });
  }

  clearSession() {
    localStorage.removeItem('token'); // clear token
    // clear other session data if needed
  }
}
