import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-popup',
  imports: [],
  templateUrl: './profile-popup.html',
  styleUrl: './profile-popup.scss',
})
export class ProfilePopup {
@Output() close = new EventEmitter<void>();
  constructor(private router: Router) {}

  goToSettings() {
    this.close.emit(); // close popup
    this.router.navigate(['/setting-popup']); // navigate
  }

    goToPayment() {
    this.close.emit();             // close the popup first
    this.router.navigate(['/payment']);  // navigate to PaymentComponent
  }
   goToPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }
}
