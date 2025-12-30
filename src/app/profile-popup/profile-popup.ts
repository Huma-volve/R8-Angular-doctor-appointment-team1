import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth1 } from '../core/services/auth1';
import { Logout } from '../logout';

@Component({
  selector: 'app-profile-popup',
  standalone: true,
  templateUrl: './profile-popup.html',
  styleUrls: ['./profile-popup.scss'],
})
export class ProfilePopupComponent {
  @Output() close = new EventEmitter<void>();

  constructor(
    private router: Router,
     private authService: Auth1,
     private logoutService:Logout
  ) {}

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.logoutService.logout().subscribe({
        next: (res) => {
          console.log('Logged out:', res);
          this.logoutService.clearSession();
          this.router.navigate(['/login']); // redirect to login page
        },
        error: (err) => {
          console.error('Logout failed:', err);
          alert(err.error?.message || 'Logout failed!');
        }
      });
    }
  }
  goToPayment() {
    this.router.navigate(['/payment']);
    this.close.emit();
  }

  goToSettings() {
    this.router.navigate(['/setting-popup']);
    this.close.emit();
  }

  goToPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
    this.close.emit();
  }


}
