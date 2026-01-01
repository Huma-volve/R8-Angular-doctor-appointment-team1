// import { BookingsApi } from './../../models/features/appointment/data-access/bookings.api.ts';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AppointmentDraft, DayVM, SlotVM } from '../../models/appointment';

// import { CreateBookingResponse } from '../../data-access/bookings.api';

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDraft, DayVM, SlotVM } from '../../models/appointment';
import { BookingsApi, CreateBookingResponse } from '../../models/features/appointment/data-access/bookings.api.ts';

@Component({
  selector: 'app-booking-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-panel.html',
  styleUrls: ['./booking-panel.scss'],
})

export class BookingPanelComponent {
  private bookingsApi = inject(BookingsApi);

  // ✅ اللي ييجي من appointment-page
  @Input({ required: true }) doctorId!: string;
  @Input() paymentMethod: string = 'stripe';
  @Input() notes: string = '';

  // ✅ دلوقتي بقى موجودين (عشان الـ HTML)
  days: DayVM[] = [];
  slots: SlotVM[] = [

    { id: '07:30', label: '07:30', value: '07:30' },
    { id: '08:30', label: '08:30', value: '08:30' },
    { id: '09:30', label: '09:30', value: '09:30' },
    { id: '10:30', label: '10:30', value: '10:30' },
    { id: '11:30', label: '11:30', value: '11:30' },
    { id: '12:30', label: '12:30', value: '12:30' },
  ];

  // (اختياري) لو تحب تطلع نتيجة الحجز
  @Output() booked = new EventEmitter<CreateBookingResponse>();

  // state
  draft: AppointmentDraft = {};
  loading = false;
  errorMsg = '';
  successMsg = '';

  // الشهر الحالي
  currentMonth: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

  ngOnInit() {
    this.buildDaysForCurrentMonth();
  }

  // ✅ علشان HTML {{ monthLabel }}
  get monthLabel(): string {
    return this.currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  // ✅ أسهم الشهور
  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.buildDaysForCurrentMonth();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.buildDaysForCurrentMonth();
  }

  // ✅ توليد أيام الشهر (منطقي + كامل + هيتعمله scroll في الـ CSS)
  buildDaysForCurrentMonth() {
    this.draft = {}; // reset selection
    this.clearMessages();

    const y = this.currentMonth.getFullYear();
    const m = this.currentMonth.getMonth();
    const lastDay = new Date(y, m + 1, 0).getDate();

    const result: DayVM[] = [];
    for (let day = 1; day <= lastDay; day++) {
      const dt = new Date(y, m, day);
      const iso = dt.toISOString().slice(0, 10); // YYYY-MM-DD

      result.push({
        id: iso,
        dateISO: iso,
        label: dt.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: dt.getDate(), // 1..31 (مش 01)
        disabled: false,
      });
    }

    this.days = result;
  }

  // ===== Selection =====
  selectDay(d: DayVM) {
    if (d.disabled || this.loading) return;
    this.draft = { day: d, slot: undefined };
    this.clearMessages();
  }

  selectSlot(s: SlotVM) {
    if (s.disabled || this.loading) return;
    this.draft = { ...this.draft, slot: s };
    this.clearMessages();
  }

  isDaySelected(d: DayVM) {
    return this.draft.day?.id === d.id;
  }

  isSlotSelected(s: SlotVM) {
    return this.draft.slot?.id === s.id;
  }

  get canBook() {
    return !!this.doctorId && !!this.draft.day && !!this.draft.slot && !this.loading;
  }

  get summary() {
    if (!this.draft.day || !this.draft.slot) return '';
    return `${this.draft.day.label} ${this.draft.day.dayNumber} - ${this.draft.slot.label}`;
  }

  // ===== API booking =====
  onBook() {
    if (!this.canBook) return;

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const body = {
      doctor_id: this.doctorId,
      appointment_date: this.draft.day!.dateISO,
      appointment_time: this.draft.slot!.value,
      payment_method: this.paymentMethod,
      notes: this.notes,
    };

    this.bookingsApi.createBooking(body).subscribe({
      next: (res) => {
        this.successMsg = `Booking created ✅ (ID: ${res.data.id})`;
        this.booked.emit(res);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message ?? 'Booking failed ❌';
      },
      complete: () => (this.loading = false),
    });
  }

  private clearMessages() {
    this.errorMsg = '';
    this.successMsg = '';
  }
}
