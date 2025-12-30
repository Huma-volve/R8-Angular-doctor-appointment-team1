import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-password-setting',
  imports: [],
  templateUrl: './password-setting.html',
  styleUrl: './password-setting.scss',
})
export class PasswordSetting {
 constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
