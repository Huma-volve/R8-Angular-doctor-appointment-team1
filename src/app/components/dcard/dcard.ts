import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DocService } from './service/doc-service';

@Component({
  selector: 'app-dcard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dcard.html',
  styleUrl: './dcard.css',
})
export class Dcard implements OnInit {
  allDoctors: any[] = []; // السطر دا علشان اعرض كل ال cards
  isSidebarOpen = false;
  doctors: any[] = [];
  data: any[] = [];
  filteredDoctors: any[] = [];   // السطر دا علشان اعرض كل ال cards
  selectedSpecialty: string | null = null;

  @ViewChild('buttonsWrapper', { static: false }) buttonsWrapper!: ElementRef;
    scrollAmount = 150; 


  constructor(private router: Router,
    private docService: DocService,
  ) { }

  ngOnInit() {
    this.docService.getAllDoctors().subscribe({
      next: (res: any) => {
        this.allDoctors = res.data;
        this.doctors = res.data;
        this.filteredDoctors = this.doctors;

        console.log('ALL DOCTORS:', this.allDoctors);
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.docService.getDoctorsAv(3).subscribe({
    next:(res:any) => {
      console.log(res.data);
    },
    error: (err) => console.log(err)
  })
  }


  moveMe() {
    this.router.navigateByUrl(`/dmap`)
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  doneApp() {
    alert('You have been booked an appointment successfully')
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    console.log('SEARCH VALUE:', value);

    this.doctors = this.allDoctors.filter((doctor: any) =>
      doctor.name.toLowerCase().includes(value)
    );

    console.log('FILTERED DOCTORS:', this.doctors);
  }

  sortDoctors(type: string) {
    if (!this.doctors || this.doctors.length === 0) return;

    if (type === 'priceLow') {
      this.doctors = [...this.doctors].sort(
        (a, b) => a.session_price - b.session_price
      );
    } else if (type === 'priceHigh') {
      this.doctors = [...this.doctors].sort(
        (a, b) => b.session_price - a.session_price
      );
    } else if (type === 'recommended') {
      this.doctors = [...this.doctors].sort(
        (a, b) => b.rating - a.rating
      );
    }
  }

// من اول هنا عشان اعرض ال cards
loadDoctors() {
  this.docService.getAllDoctors().subscribe({
    next: (res: any) => {
      console.log(res.data);
      this.allDoctors = res.data;     // الأصل
      this.doctors = res.data;        // اللي بيتعرض
    },
    error: (err) => console.error(err)
  });
}

filterBySpecialty(specialtyName: string) {
  this.doctors = this.allDoctors.filter(
    doctor => doctor.specialty.name === specialtyName
  );
}
getThemAll() {
  this.doctors = this.allDoctors;
}
// لحد هنا عشان اعرض كل ال cards

// for today and tomorrow ya lolo
getFormattedDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0]; // yyyy-mm-dd
}
filterByAvailability(day: 'today' | 'tomorrow') {
  const targetDate =
    day === 'today'
      ? this.getFormattedDate(0)
      : this.getFormattedDate(1);

  this.doctors = this.allDoctors.filter((doctor: any) =>
    doctor.availability?.some(
      (slot: any) => slot.date === targetDate
    )
  );
}

  scrollLeft() {
    this.buttonsWrapper.nativeElement.scrollBy({
      left: -this.scrollAmount,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.buttonsWrapper.nativeElement.scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth'
    });
  }

doctorsGender = [
  {name: 'Doctor 1', gender: 'male'},
  {name: 'Doctor 1', gender: 'male'},
  {name: 'Doctor 1', gender: 'male'},
  {name: 'Doctor 1', gender: 'male'},
  {name: 'Doctor 1', gender: 'male'}
]


}

