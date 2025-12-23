import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormHeader } from '../../components/form-header/form-header';

@Component({
  selector: 'app-edit-phone',
  standalone: true, // mark as standalone if using imports
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-phone.html',
  styleUrls: ['./edit-phone.scss'], // fixed
})
export class EditPhone {
  // Add your form logic here
}
