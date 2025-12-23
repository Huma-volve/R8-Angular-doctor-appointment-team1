import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPanelComponent } from '../../components/booking-panel/booking-panel';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule, BookingPanelComponent, DoctorCardComponent],
  templateUrl: './appointment-page.html',
  styleUrls: ['./appointment-page.scss'],
})
export class AppointmentPageComponent {
  doctorId = '2';
}
