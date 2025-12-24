import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocService } from '../dcard/service/doc-service';
import { environment } from '../../../environments/environment.development';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-dmap',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './dmap.html',
  styleUrl: './dmap.scss',
})
export class Dmap implements OnInit {
    center = { lat: 30.0444, lng: 31.2357 };  // مثال على إحداثيات القاهرة
  zoom = 12;
markers: Array<{ position: { lat: number, lng: number }, title: string }> = [];


  doctors: any[] = [];
  allDoctors: any[] = [];  // <-- عرفته هنا
  nearbyDoctors: any[] = [];
  userLat!: number;
  userLng!: number;
  MAX_DISTANCE_KM = 20; // تقدري تغيريها (مثلا 5 أو 20)

  constructor(private http: HttpClient,
    private docService: DocService) { }
  ngOnInit(): void {
    this.loadDoctors();

    this.docService.getAllDoctors().subscribe({
  next: (res: any) => {
    this.doctors = res.data;

    // جهزي الماركرز بناءً على بيانات الدكاترة
    this.markers = this.doctors
      .filter(doc => doc.location && doc.location.latitude && doc.location.longitude)
      .map(doc => ({
        position: {
          lat: doc.location.latitude,
          lng: doc.location.longitude
        },
        title: doc.name
      }));

    // اختياري: خلي مركز الخريطة على أول دكتور ليه موقع
    if (this.markers.length > 0) {
      this.center = this.markers[0].position;
    }
  },
  error: (err) => console.error(err)
});

  }

  getAllDoctors() {
    const headers = new HttpHeaders({
      Authorization: `Bearer 125|tfeF5WypxyNzIdpylJrGjvhHOo5Op6xql2E0sfLhabde8fe0`
    });

    return this.http.get(environment.baseUrl + `/api/doctors`, { headers }
    );
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;

          this.filterNearbyDoctors();
        },
        (error) => {
          console.error('Location error', error);
        }
      );
    }
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (x: number) => (x * Math.PI) / 180;

    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // المسافة بالكيلومتر
  }

  filterNearbyDoctors() {
    this.doctors = this.allDoctors.filter(doctor => {
      const lat = doctor.location?.latitude;
      const lng = doctor.location?.longitude;

      if (!lat || !lng) return false;

      const distance = this.calculateDistance(this.userLat, this.userLng, lat, lng);

      return distance <= this.MAX_DISTANCE_KM;
    });
  }
  loadDoctors() {
    this.docService.getAllDoctors().subscribe({
      next: (res: any) => {
        this.allDoctors = res.data;
        this.doctors = res.data; // عرض كل الدكاترة في البداية
        this.getUserLocation();
      },
      error: (err) => console.error(err)
    });
  }

}
