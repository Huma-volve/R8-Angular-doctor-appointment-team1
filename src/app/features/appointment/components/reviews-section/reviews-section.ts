
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Review = {
  name: string;
  time: string;
  rating: number;
  text: string;
  avatarUrl: string;
};

@Component({
  selector: 'app-reviews-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-section.html',
  styleUrls: ['./reviews-section.scss'],
})
export class ReviewsSectionComponent {
  overall = 4.5;
  totalReviews = 1250;

  reviews: Review[] = [
    {
      name: 'Nabila Reyna',
      time: '30 min ago',
      rating: 4.5,
      text: 'Excellent service! Dr. Jessica Turner was attentive and thorough. The clinic was clean, and the staff were friendly. Highly recommend for in-person care!',
      avatarUrl: 'https://i.pravatar.cc/80?img=5',
    },
    {
      name: 'Ferry Ichsan A',
      time: 'A week ago',
      rating: 4.5,
      text: 'Quick and easy appointment! Dr. Jessica Turner was professional, and the staff made me feel comfortable. Highly recommend!',
      avatarUrl: 'https://i.pravatar.cc/80?img=12',
    },
  ];
}
