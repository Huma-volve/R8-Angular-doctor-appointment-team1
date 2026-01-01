import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-success-modal.component.html',
  styleUrls: ['./appointment-success-modal.component.scss'],
})
export class AppointmentSuccessModalComponent {
  @Input() doctorName = 'Dr. David Patel';
  @Input() date = 'June 30, 2023';
  @Input() time = '10:00 AM';

  @Output() done = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  close() {
    this.done.emit();
  }

  editAppointment() {
    this.edit.emit();
  }


  showSuccess = true;

onDone() {
  this.showSuccess = false;
  // navigate to home or appointments
}

onEdit() {
  this.showSuccess = false;
  // navigate to edit appointment
}

}
