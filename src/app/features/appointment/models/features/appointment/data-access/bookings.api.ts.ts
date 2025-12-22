import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CreateBookingBody = {
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  payment_method: string;
  notes?: string;
};

export type CreateBookingResponse = {
  data: {
    id: number;
    doctor: { id: number; name: string; speciality: string; image: string | null; address: string };
    patient: { id: number; name: string; image: string | null };
    appointment_date: string;
    appointment_time: string;
    status: string;
    price: number;
    payment_method: string;
    payment_status: string;
    notes: string | null;
    cancellation_reason: string | null;
    cancelled_at: string | null;
    created_at: string;
  };
};

@Injectable({ providedIn: 'root' })
export class BookingsApi {
  private baseUrl = 'https://round8-backend-team-one.huma-volve.com';

  constructor(private http: HttpClient) {}

  createBooking(body: CreateBookingBody): Observable<CreateBookingResponse> {
    return this.http.post<CreateBookingResponse>(`${this.baseUrl}/api/bookings`, body);
  }
}
