import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilePopupComponent } from "../../profile-popup/profile-popup";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [ProfilePopupComponent,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  showProfile = false;

  constructor(private router: Router) {}

  openProfile() {
    console.log('Profile clicked ✅');
    this.showProfile = true;
  }

  closeProfile() {
    this.showProfile = false;
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);
  }
  showMenu = false;

toggleMenu() {
  this.showMenu = !this.showMenu;
}

goTohome(){
  this.router.navigate(['/']);
}
goTobooking(){
  this.router.navigate(['/booking']);
}
goTochat(){
  this.router.navigate(['/chat']);
}
}
