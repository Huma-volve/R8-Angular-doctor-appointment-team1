import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth1 {
 private baseUrl = 'https://round8-cure-php-team-two.huma-volve.com';

  constructor(private http: HttpClient) {}

  // 🔴 Logout API
  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/profile/logout`,
      {}
    );
  }
}
