import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrls: ['./payment.scss'], // fixed
})
export class Payment {
  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // or use this.location.back();
  }

  goToAddNewCard() {
    this.router.navigate(['/add-new-card']);
  }
}
