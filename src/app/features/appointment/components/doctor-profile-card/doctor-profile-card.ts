
import { Component, OnInit ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../booking-api.service';
import { BookingApiService } from './booking-api.service';
@Component({
  selector: 'app-doctor-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-profile-card.html',
  styleUrls: ['./doctor-profile-card.scss'],
})
export class DoctorProfileCardComponent implements OnInit {

  // doctor = {
  //   name: 'Dr. Jessica Turner',
  //   title: 'Pulmonologist',
  //   patients: '2,000+',
  //   experience: '10+',
  //   rating: '4.5',
  //   reviews: '1,872',
  //   about:
  //     'Dr. Jessica Turner, a board-certified Pulmonologist with over 8 years of experience in diagnosing and treating a wide range of respiratory...',
  //   address: '129, El-Nasr Street, Cairo, Egypt',
  // };

  private route = inject(ActivatedRoute);
  private BookingApiService = inject(BookingApiService);

  doctor: Doctor | null = null;

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id'); // "15"
    const id = Number(idStr);

    if (!id || Number.isNaN(id)) {
      // id غلط / مش موجود
      return;
    }

    this.BookingApiService.getDoctorById(id).subscribe({
      next: (data) => (this.doctor = data),
      error: (err) => console.error(err),
    });
  }

}


