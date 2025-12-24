import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setting-popup',
  templateUrl: './setting-popup.html',
  styleUrls: ['./setting-popup.scss'], // fixed
})
export class SettingPopup {
  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back();
  }

  goToPassword() {
    this.router.navigate(['/passwordsetting']);
  }
}
