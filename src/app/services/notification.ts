// src/app/services/notification.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService { // <-- rename to NotificationService
  private baseUrl = 'https://round8-cure-php-team-two.huma-volve.com/api/v1';

  constructor(private http: HttpClient) {}

  // 🔔 Get all notifications
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications`);
  }

  // 🔔 Get unread notifications
  getUnread(): Observable<any> {
    return this.http.get(`${this.baseUrl}/notifications/unread`);
  }

  // ✅ Mark notification as read
  markAsRead(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/notifications/${id}/read`, {});
  }
}
