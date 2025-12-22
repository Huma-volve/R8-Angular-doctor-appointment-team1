import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
};

type ApiDoctor = {
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

  // Optional لو موجودين عندكم
  rating?: number;
  reviews_count?: number;
};

type DoctorVm = {
  id: number;
  name: string;
  specialtyName: string;
  bio: string;
  sessionPrice: number;
  clinicAddress: string;
  experienceYears: number;
  photoUrl: string;
  rating?: number;
  reviewsCount?: number;
};

type VmState =
  | { state: 'loading' }
  | { state: 'loaded'; doctor: DoctorVm }
  | { state: 'error'; message: string };

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-card.html',
  styleUrls: ['./doctor-card.scss'],
})
export class DoctorCardComponent implements OnChanges {
  @Input({ required: true }) specialtyId!: number;
  @Input({ required: true }) doctorId!: number;

  vm$: Observable<VmState> = of({ state: 'loading' });

  // ✅ عدّلهم حسب مشروعك
  private apiBase = 'https://round8-backend-team-one.huma-volve.com';
  private photoBase = '/storage/'; // لو صورك من /storage/...

  constructor(private http: HttpClient) {}

  ngOnChanges(): void {
    if (!this.specialtyId || !this.doctorId) {
      this.vm$ = of({ state: 'error', message: 'Invalid inputs' });
      return;
    }

    this.vm$ = this.http
      .get<ApiResponse<ApiDoctor[]>>(
        `${this.apiBase}/doctors?specialty_id=${this.specialtyId}`
      )
      .pipe(
        map((res) => res.data?.find((d) => d.id === this.doctorId)),
        map((d) => {
          if (!d) return { state: 'error', message: 'Doctor not found' } as VmState;

          const vm: DoctorVm = {
            id: d.id,
            name: d.name,
            specialtyName: d.specialty?.name ?? '—',
            bio: d.bio ?? '',
            sessionPrice: d.session_price ?? 0,
            clinicAddress: d.clinic_address ?? '',
            experienceYears: d.experience_years ?? 0,
            photoUrl: d.profile_photo
              ? `${this.photoBase}${d.profile_photo}`
              : 'https://via.placeholder.com/80',
            rating: d.rating,
            reviewsCount: d.reviews_count,
          };

          return { state: 'loaded', doctor: vm } as VmState;
        }),
        startWith({ state: 'loading' } as VmState),
        catchError(() => of({ state: 'error', message: 'Failed to load doctor' } as VmState))
      );
  }
}
