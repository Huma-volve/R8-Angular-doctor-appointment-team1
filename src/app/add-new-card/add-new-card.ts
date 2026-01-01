import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-card',
  imports: [],
  templateUrl: './add-new-card.html',
  styleUrl: './add-new-card.scss',
})
export class AddNewCard {
  constructor(private router: Router) {}
goBackToPayment(): void {
    this.router.navigate(['/payment']);
  }
}
