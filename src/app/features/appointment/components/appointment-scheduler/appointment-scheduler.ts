

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSuccessModalComponent } from '../../../modal/appointment-success-modal.component/appointment-success-modal.component';
import { RouterLink } from '@angular/router';

type DayItem = { label: string; day: number; date: Date };
type SlotItem = { id: string; label: string; available: boolean; time24: string };

@Component({
  selector: 'app-appointment-scheduler',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './appointment-scheduler.html',
  styleUrls: ['./appointment-scheduler.scss'],
})
export class AppointmentSchedulerComponent {
  @Output() dateChange = new EventEmitter<string>(); // YYYY-MM-DD
  @Output() timeChange = new EventEmitter<string>(); // HH:mm
@Output() bookClick = new EventEmitter<void>();

onBookClick() {
  this.bookClick.emit();
}
  currentMonth = new Date();
  selectedDayIndex = 0;
  selectedSlotId: string | null = null;

  days: DayItem[] = this.buildWeekDays(this.currentMonth, new Date().getDate());

  slots: SlotItem[] = [
    { id: 's1', label: '9:00 AM',  time24: '09:00', available: true },
    { id: 's2', label: '10:00 AM', time24: '10:00', available: true },
    { id: 's3', label: '11:30 AM', time24: '11:30', available: true },
    { id: 's4', label: '12:30 PM', time24: '12:30', available: true },
    { id: 's5', label: '5:30 PM',  time24: '17:30', available: true },
    { id: 's6', label: '7:00 PM',  time24: '19:00', available: true },
  ];

ngOnInit() {
  const today = new Date();
  this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  this.days = this.buildWeekDays(today, today.getDate());
  this.selectedDayIndex = 0;
  this.emitSelectedDate();
}

  get monthLabel() {
    return this.currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  get selectedDate(): Date {
    return this.days[this.selectedDayIndex]?.date ?? new Date();
  }

  get selectedSlotLabel(): string {
    return this.slots.find(s => s.id === this.selectedSlotId)?.label ?? '';
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.days = this.buildWeekDays(this.currentMonth, 1);
    this.selectedDayIndex = 0;
    this.selectedSlotId = null;
    this.emitSelectedDate();
    this.timeChange.emit(''); // reset
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.days = this.buildWeekDays(this.currentMonth, 1);
    this.selectedDayIndex = 0;
    this.selectedSlotId = null;
    this.emitSelectedDate();
    this.timeChange.emit('');
  }

  selectDay(i: number) {
    this.selectedDayIndex = i;
    this.selectedSlotId = null;
    this.emitSelectedDate();
    this.timeChange.emit('');
  }

  selectSlot(slot: SlotItem) {
  if (!slot.available) return;
  this.selectedSlotId = slot.id;
  this.timeChange.emit(slot.time24); // ✅ HH:mm
}

private emitSelectedDate() {
    this.dateChange.emit(this.toYmd(this.selectedDate)); // ✅ YYYY-MM-DD
  }

  private toYmd(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private buildWeekDays(baseDate: Date, startDay: number) {
  const labels = ['Fri','Sat','Sun','Mon','Tue','Wed','Thu'];
  const base = new Date(baseDate.getFullYear(), baseDate.getMonth(), startDay);

  return labels.map((label, idx) => {
    const d = new Date(base);
    d.setDate(base.getDate() + idx);
    return { label, day: d.getDate(), date: d };
  });
}


}
