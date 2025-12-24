import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth1 } from '../core/services/auth1';

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
     private authService: Auth1
  ) {}


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

  // 🔴 LOGOUT FUNCTION
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        // ✅ Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // ✅ Close popup
        this.close.emit();

        // ✅ Redirect to register/login page
        this.router.navigate(['/register']);
        // أو '/login' حسب عندك
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }
}
