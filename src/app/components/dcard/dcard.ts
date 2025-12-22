import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Dmap } from '../dmap/dmap';
import { DocService } from './service/doc-service';

@Component({
  selector: 'app-dcard',
  imports: [CommonModule, RouterModule, Dmap],
  templateUrl: './dcard.html',
  styleUrl: './dcard.scss',
})
export class Dcard implements OnInit {
allDoctors: any[] = [];
  isSidebarOpen = false;
doctors: any[] = [];
  data: any[] = [];

  constructor(private router: Router,
    private docService: DocService,
 ) { }

ngOnInit() {
  this.docService.getAllDoctors().subscribe({
    next: (res: any) => {
      this.allDoctors = res.data;
      this.doctors = res.data;

      console.log('ALL DOCTORS:', this.allDoctors);
    },
    error: (err) => {
      console.error(err);
    }
  });
}
  moveMe() {
    this.router.navigateByUrl(`/dmap`)
  }

  scrollLeft() {
    const container = document.getElementById('buttonsWrapper');
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const container = document.getElementById('buttonsWrapper');
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
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


}

