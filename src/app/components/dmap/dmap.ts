import { environment } from './../../../environment/environment';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DocService } from '../dcard/service/doc-service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-dmap',
  imports: [CommonModule],
  templateUrl: './dmap.html',
  styleUrl: './dmap.scss',
})
export class Dmap implements OnInit {
  private map!: L.Map;
  showResults = true;
  doctors: any[] = [];

  constructor(private http: HttpClient,
    private docService: DocService,
    private router: Router) { }


  ngAfterViewInit(): void {
     this.initMap();

  }
  ngOnInit(): void {
    this.docService.getAllDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res.data;
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
  initMap() {
    this.map = L.map('map', { zoomControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
    const customIcon = L.divIcon({
      html: '<i class="fa-solid fa-location-crosshairs" style="font-size: 24px; color: blue;"></i>',
      className: '',
      iconSize: [30, 40],
      iconAnchor: [15, 40],
    });
    const setMarker = (lat: number, lng: number) => {
      this.map.setView([lat, lng], 14);
      L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setMarker(position.coords.latitude, position.coords.longitude),
        () => setMarker(30.0444, 31.2357)
      );
    } else {
      setMarker(30.0444, 31.2357);
    }
  }
  goToSearch() {
    this.router.navigate(['/search-doctor']);
  }
  closeResults() {
    this.showResults = false;
  }
}
