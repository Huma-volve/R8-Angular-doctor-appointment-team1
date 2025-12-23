// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse, ApiDoctor } from '../../../appointment';
import { DoctorVm, } from '../../../appointment';
@Injectable({ providedIn: 'root' })
export class DoctorService {
  private apiBase = '/api';

  // لو عندك الصور محتاجة دومين/ستوريج
  // مثال: 'https://your-domain.com/storage/'
  private assetBase = '/storage/';

  constructor(private http: HttpClient) {}

  getDoctorsBySpecialty(specialtyId: number): Observable<DoctorVm[]> {
    return this.http
      .get<ApiResponse<ApiDoctor[]>>(`${this.apiBase}/doctors?specialty_id=${specialtyId}`)
      .pipe(
        map(res => res.data.map(d => this.toVm(d)))
      );
  }

  private toVm(d: ApiDoctor): DoctorVm {
    return {
      id: d.id,
      name: d.name,
      specialtyName: d.specialty?.name ?? '—',
      bio: d.bio ?? '',
      sessionPrice: d.session_price ?? 0,
      clinicAddress: d.clinic_address ?? '',
      experienceYears: d.experience_years ?? 0,
      photoUrl: d.profile_photo ? `${this.assetBase}${d.profile_photo}` : 'https://via.placeholder.com/80',
    };
  }
}
