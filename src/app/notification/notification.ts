import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification implements OnInit {

  notifications: any[] = [];

  constructor(
    private router: Router,
    
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 goBack(): void {
    this.router.navigate(['/']);
  }

  
}

