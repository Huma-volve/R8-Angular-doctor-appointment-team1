import { ReviewsSectionComponent } from './../../components/reviews-section/reviews-section';
import { DoctorProfileCardComponent } from './../../components/doctor-profile-card/doctor-profile-card';
import { AppointmentSchedulerComponent } from './../../components/appointment-scheduler/appointment-scheduler';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { BookingApiService } from '../../booking-api.service';

import { switchMap, map, filter, shareReplay } from 'rxjs';
@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule, AppointmentSchedulerComponent, DoctorProfileCardComponent, ReviewsSectionComponent],
  templateUrl: './appointment-page.html',
  styleUrls: ['./appointment-page.scss'],
})
export class AppointmentPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookingApi = inject(BookingApiService);
    // private doctorsApi = inject(DoctorsApiService);


  doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));

  selectedDate = ''; // YYYY-MM-DD
  selectedTime = ''; // HH:mm

  loading = false;
  error: string | null = null;

   doctor$ = this.route.paramMap.pipe(
    map(p => Number(p.get('doctorId'))),
    filter(id => id > 0),
    switchMap(id => this.bookingApi.getDoctorById(id)),
    shareReplay(1)
  );


  onDateChange(ymd: string) {
    this.selectedDate = ymd;
    this.selectedTime = '';
  }

  onTimeChange(hm: string) {
    this.selectedTime = hm || '';
  }

book() {
  if (!this.doctorId || !this.selectedDate || !this.selectedTime) return;

  this.loading = true;
  this.error = null;

  this.bookingApi.createBooking({
    doctor_id: this.doctorId,
    appointment_date: this.selectedDate,     // YYYY-MM-DD
    appointment_time: this.selectedTime,     // ✅ HH:mm فقط
    payment_method: 'stripe',
    notes: 'Doctor booking from UI',
  }).subscribe({
    next: (res) => {
      console.log('Booking created:', res.data.id);
    //  this.router.navigate(['/payment', res.data.id]);
    },
    error: (e) => {
      console.log('ERROR BODY:', e?.error);
      this.error = e?.error?.message ?? 'Booking failed';
    },
    complete: () => (this.loading = false),
  });
}


}
