import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl =
    'https://round8-backend-team-one.huma-volve.com/api/saved-cards';

  constructor(private http: HttpClient) {}

  saveCard(cardData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer 263|i6JNzMPzQtabOdDGxjVx6SZFdSy4CNCwTzZHMVfP8819a2ee`,
    });

    return this.http.post(this.apiUrl, cardData, { headers });
  }
}
