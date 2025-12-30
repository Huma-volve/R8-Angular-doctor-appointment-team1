
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

export interface DoctorDto {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  profile_photo: string | null;
  specialty: { id: number; name: string; image: string };
  license_number: string;
  bio: string;
  session_price: number;
  clinic_address: string;
  location: { latitude: number; longitude: number };
  experience_years: number;
}

export interface BookingResponse {
  data: { id: number };
}



@Injectable({ providedIn: 'root' })
export class BookingApiService {
  private baseUrl = 'https://round8-backend-team-one.huma-volve.com';

  //  test
  private token = '144|yJlpONJ77PVT847Zcb7DBykvkvYMsvjRF2wybtTaa57b9370';

  constructor(private http: HttpClient) {}

   getDoctorById(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`${this.baseUrl}/api/doctors/${id}`);
   }

  createBooking(body: CreateBookingRequest): Observable<BookingResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/json',
    });
    return this.http.post<BookingResponse>(`${this.baseUrl}/api/bookings`, body, { headers });
  }
}

