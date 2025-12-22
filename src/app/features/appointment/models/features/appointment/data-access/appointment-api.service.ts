// import { SlotVM, DoctorVM, ReviewVM, AppointmentDraft } from '../../../appointment';
// import { DayVM } from '../../../appointment';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable, of } from 'rxjs';
// // import { DayVM, SlotVM, DoctorVM, ReviewVM, AppointmentDraft } from';
// import { environment } from '../../../../../../../environments/environment';

// type AvailabilityResponse = {
//   days: Array<{ date: string; disabled?: boolean }>;   // "2025-12-20"
//   slots: Array<{ id: string; time: string; disabled?: boolean }>; // "09:00"
// };

// type BookRequest = {
//   doctorId: string;
//   date: string; // ISO
//   time: string; // "09:00"
// };

// type BookResponse = {
//   appointmentId: string;
//   status: 'CONFIRMED' | 'PENDING';
// };

// @Injectable({ providedIn: 'root' })
// export class AppointmentApiService {
//   // بدّل baseUrl حسب مشروعك
//   private baseUrl = 'https://api.example.com';
// // private baseUrl = environment.apiBaseUrl;

//   constructor(private http: HttpClient) {}

//   // ===== Doctor =====
//   getDoctor(doctorId: string): Observable<DoctorVM> {
//     // API الحقيقي (مثال):
//     // return this.http.get<DoctorVM>(`${this.baseUrl}/api/doctors/${doctorId}`);

//     // Mock مؤقت:
//     return of({
//       name: 'Dr. Jessica Turner',
//       specialty: 'Pulmonologist',
//       avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop',
//       verified: true,
//       stats: { patients: '2,000+', experience: '10+', rating: '4.5', reviews: '1,872' },
//       about: 'Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience...',
//       address: '129, El-Nasr Street, Cairo, Egypt',
//       mapEmbedUrl: 'https://www.google.com/maps?q=LA%20CONDESA&output=embed',
//     });
//   }

//   getReviews(doctorId: string): Observable<ReviewVM[]> {
//     // API الحقيقي:
//     // return this.http.get<ReviewVM[]>(`${this.baseUrl}/api/reviews/all`);

//     return of([
//       {
//         id: 'r1',
//         userName: 'Nabila Reyna',
//         userAvatarUrl: 'https://i.pravatar.cc/100?img=47',
//         timeAgo: '30 min ago',
//         rating: 4.5,
//         text: 'Excellent service! Dr. Jessica Turner was attentive and thorough...',
//       },
//       {
//         id: 'r2',
//         userName: 'Ferry Ichsan A',
//         userAvatarUrl: 'https://i.pravatar.cc/100?img=12',
//         timeAgo: 'A week ago',
//         rating: 4.5,
//         text: 'Quick and easy appointment! Dr. Jessica Turner was professional...',
//       },
//     ]);
//   }

//   // ===== Availability =====
//   getAvailability(doctorId: string, monthISO: string): Observable<{ days: DayVM[]; slots: SlotVM[] }> {
//     // API الحقيقي:
//     // return this.http.get<AvailabilityResponse>(`${this.baseUrl}/doctors/${doctorId}/availability`, { params: { month: monthISO } })
//     //   .pipe(map(res => this.mapAvailability(res)));

//     // Mock:
//     const days: DayVM[] = [
//       { id: 'd1', label: 'Fri', dayNumber: 12, dateISO: '2025-12-12' },
//       { id: 'd2', label: 'Sat', dayNumber: 13, dateISO: '2025-12-13' },
//       { id: 'd3', label: 'Sun', dayNumber: 14, dateISO: '2025-12-14' },
//       { id: 'd4', label: 'Mon', dayNumber: 15, dateISO: '2025-12-15' },
//       { id: 'd5', label: 'Tue', dayNumber: 16, dateISO: '2025-12-16' },
//       { id: 'd6', label: 'Wed', dayNumber: 17, dateISO: '2025-12-17' },
//       { id: 'd7', label: 'Thu', dayNumber: 18, dateISO: '2025-12-18' },
//     ];

//     const slots: SlotVM[] = [
//       { id: 's1', label: '9:00 AM', value: '09:00' },
//       { id: 's2', label: '10:00 AM', value: '10:00' },
//       { id: 's3', label: '11:00 AM', value: '11:00' },
//       { id: 's4', label: '12:30 AM', value: '00:30' },
//       { id: 's5', label: '5:30 PM', value: '17:30' },
//       { id: 's6', label: '7:00 PM', value: '19:00' },
//       { id: 's7', label: '9:00 PM', value: '21:00' },
//       { id: 's8', label: '10:00 PM', value: '22:00' },
//     ];

//     return of({ days, slots });
//   }

//   // ===== Booking =====
//   bookAppointment(doctorId: string, draft: AppointmentDraft): Observable<BookResponse> {
//     if (!draft.day || !draft.slot) throw new Error('Draft incomplete');

//     const payload: BookRequest = {
//       doctorId,
//       date: draft.day.dateISO,
//       time: draft.slot.value,
//     };

//     // API الحقيقي:
//     // return this.http.post<BookResponse>(`${this.baseUrl}/appointments`, payload);

//     // Mock:
//     return of({ appointmentId: 'APT-1001', status: 'CONFIRMED' });
//   }

//   // مثال mapping لو API بيرجع شكل مختلف:
//   private mapAvailability(res: AvailabilityResponse) {
//     const days: DayVM[] = res.days.map(d => {
//       const dt = new Date(d.date);
//       return {
//         id: d.date,
//         label: dt.toLocaleDateString('en-US', { weekday: 'short' }),
//         dayNumber: dt.getDate(),
//         dateISO: d.date,
//         disabled: d.disabled,
//       };
//     });

//     const slots: SlotVM[] = res.slots.map(s => ({
//       id: s.id,
//       value: s.time,
//       label: this.formatTime(s.time),
//       disabled: s.disabled,
//     }));

//     return { days, slots };
//   }

//   private formatTime(time24: string) {
//     // "17:30" -> "5:30 PM"
//     const [hStr, mStr] = time24.split(':');
//     let h = Number(hStr);
//     const m = Number(mStr);
//     const ampm = h >= 12 ? 'PM' : 'AM';
//     h = h % 12;
//     if (h === 0) h = 12;
//     return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({ providedIn: 'root' })
// export class AppointmentApiService {
//   private baseUrl = 'https://round8-backend-team-one.huma-volve.com';

//   constructor(private http: HttpClient) {}

//   createBooking(body: {
//     doctor_id: string;
//     appointment_date: string;
//     appointment_time: string;
//     payment_method: string;
//     notes?: string;
//   }) {
//     return this.http.post(
//       `${this.baseUrl}/api/bookings`,
//       body
//     );
//   }
// }
