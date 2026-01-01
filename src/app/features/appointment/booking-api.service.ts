
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateBookingRequest {
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  payment_method: 'stripe' | 'paypal' | 'cash';
  notes?: string;
}

export interface Root {
  success: boolean
  message: string
  data: Doctor
}

export interface Doctor {
  id: number
  name: string
  email: string
  mobile: any
  address: string
  patient_count: number
  reviews_count: number
  rating_avg: string
  profile_photo: any
  specialty: Specialty
  license_number: string
  about_me: string
  session_price: number
  clinic_address: string
  location: Location
  experience_years: number
}

export interface Specialty {
  id: number
  name: string
  image: string
}

export interface Location {
  latitude: number
  longitude: number
}

export interface BookingResponse {
  data: { id: number };
}
@Injectable({ providedIn: 'root' })
export class BookingApiService {

  private baseUrl = 'https://round8-backend-team-one.huma-volve.com';

  //  test
  private token = '274|hMvDAxA5E24ygDcs2EpTEFMkO52Iv5hEjwY24Xy242769835';

  constructor(private http: HttpClient) {}

   getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/api/doctors/${id}`);
   }

  createBooking(body: CreateBookingRequest): Observable<BookingResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
    });
    return this.http.post<BookingResponse>(`${this.baseUrl}/api/bookings`, body, { headers });
  }
}

