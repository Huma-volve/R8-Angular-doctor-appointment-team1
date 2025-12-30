import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type PayMethod = 'card' | 'paypal' | 'apple';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent {
  doctor = {
    name: 'Dr. Jessica Turner',
    title: 'Pulmonologist',
    address: '129,El-Nasr Street, Cairo',
    avatar:
      'https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&auto=format&fit=crop&q=60',
  };

  appointmentText = 'Friday, July 17 - 4:00pm';

  method: PayMethod = 'card';

  price = 350;
  unit = 'hour';

  onReschedule() {
    alert('Reschedule clicked');
  }

  addNewCard() {
    alert('Add new card');
  }

  pay() {
    alert(`Pay with: ${this.method}`);
  }
}

