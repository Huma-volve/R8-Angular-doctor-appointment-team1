import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardService } from '../services/card';

@Component({
  selector: 'app-add-new-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-new-card.html',
  styleUrls: ['./add-new-card.scss'],
})
export class AddNewCardComponent {
  constructor(private router: Router, private cardService: CardService) {}

  card = {
    brand: 'MasterCard',
    last_four: '',
    exp_month: '',
    exp_year: '',
    is_default: true,
  };

  saveCard(): void {
    // ✅ Validate required fields
    if (!this.card.last_four || !this.card.exp_month || !this.card.exp_year) {
      alert('Please fill in all required fields.');
      return;
    }

    // ✅ Validate expiry month
    const month = Number(this.card.exp_month);
    if (month < 1 || month > 12) {
      alert('Expiry month must be between 1 and 12.');
      return;
    }

    // ✅ Validate expiry year
    const year = Number(this.card.exp_year);
    const currentYear = new Date().getFullYear();
    if (year < 2025) {
      alert('Expiry year must be at least 2025.');
      return;
    }

    const payload = {
      provider_token: '263|i6JNzMPzQtabOdDGxjVx6SZFdSy4CNCwTzZHMVfP8819a2ee',
      brand: this.card.brand,
      last_four: this.card.last_four.slice(-4),
      exp_month: month,
      exp_year: year,
      is_default: this.card.is_default,
    };

    console.log('PAYLOAD 👉', payload);

    this.cardService.saveCard(payload).subscribe({
      next: (res) => {
        console.log('SUCCESS ✅', res);
        alert('Card saved successfully');
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error('FAILED ❌', err);
        alert(err.error?.message || 'API Error');
      },
    });
  }

  goBackToPayment(): void {
    this.router.navigate(['/payment']);
  }
}
