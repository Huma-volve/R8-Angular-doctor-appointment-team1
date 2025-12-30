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
  console.log('Save button clicked ✅'); // <- check this first

  const payload = {
    brand: this.card.brand,
    last_four: this.card.last_four.slice(-4),
    exp_month: Number(this.card.exp_month),
    exp_year: Number(this.card.exp_year),
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
goBackToPayment(){
this.router.navigate(['payment']);
}
}
