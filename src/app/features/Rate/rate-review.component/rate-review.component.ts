import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-review',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate-review.component.html',
  styleUrls: ['./rate-review.component.scss'],
})
export class RateReviewComponent {
  rating = 4;        // default like الصورة
  hover = 0;         // للهوفر
  review = '';

  setRating(v: number) {
    this.rating = v;
  }

  setHover(v: number) {
    this.hover = v;
  }

  clearHover() {
    this.hover = 0;
  }

  submit() {
    const payload = { rating: this.rating, review: this.review.trim() };
    // هنا هتربط API بعدين
    alert(JSON.stringify(payload, null, 2));
  }

  get shownRating() {
    return this.hover || this.rating;
  }
}
