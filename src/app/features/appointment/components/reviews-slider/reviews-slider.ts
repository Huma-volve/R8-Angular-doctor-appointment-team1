import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewVM } from '../../models/appointment';

@Component({
  selector: 'app-reviews-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews-slider.html',
  styleUrls: ['./reviews-slider.scss'],
})
export class ReviewsSliderComponent {
  @Input({ required: true }) ratingText!: string; // "4.5/5"
  @Input({ required: true }) reviewsCountText!: string; // "1250+ Reviews"
  @Input() reviews: ReviewVM[] = [];

  @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

  scrollBy(dir: 'left' | 'right') {
    const el = this.track.nativeElement;
    const amount = 340; // تقريباً عرض كارد
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }

  stars(n: number) {
    return Array.from({ length: 5 }, (_, i) => i < Math.round(n));
  }
}
