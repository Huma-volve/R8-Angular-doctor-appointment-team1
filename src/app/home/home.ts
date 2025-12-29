import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  imports: [CommonModule],
  styleUrls: ['./home.scss'], // fixed styleUrls
})
export class Home implements AfterViewInit {
  private map!: L.Map;

  doctors = [
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      rating: 4.8,
      time: '9:30am - 8:00pm',
      price: 350,
      image: '/assets/Rectangle 1673.png',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      rating: 4.8,
      time: '9:30am - 8:00pm',
      price: 350,
      image: '/assets/Rectangle 1673.png',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      rating: 4.8,
      time: '9:30am - 8:00pm',
      price: 350,
      image: '/assets/Rectangle 1673.png',
    },
    {
      name: 'Robert Johnson',
      specialty: 'Orthopedic',
      hospital: 'El-Nasr Hospital',
      rating: 4.8,
      time: '9:30am - 8:00pm',
      price: 350,
      image: '/assets/Rectangle 1673.png',
    },
  ];

  stars = Array(5);
  avatars = [
    '/assets/Image Grup.png',
    '/assets/Image Grup.png',
    '/assets/Image Grup.png',
    '/assets/Image Grup.png',
    '/assets/Image Grup.png',
  ];

  faqs = [
    { question: 'What is this app used for?' },
    { question: 'Is the app free to use?' },
    { question: 'How can I find a doctor?' },
    { question: 'Can I cancel my appointment?' },
    { question: 'What payment are supported' },
    { question: 'How do I edit my profile?' },
  ];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
  }
 
  // مهم
  initMap() {
    this.map = L.map('map', { zoomControl: false });

    // Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // Custom icon
    const customIcon = L.divIcon({
      html: '<i class="fa-solid fa-location-crosshairs" style="font-size: 24px; color: blue;"></i>',
      className: '', // remove default 'leaflet-div-icon' styling
      iconSize: [30, 40],
      iconAnchor: [15, 40], // where the icon points on the map
    });

    const setMarker = (lat: number, lng: number) => {
      this.map.setView([lat, lng], 14);
      L.marker([lat, lng], { icon: customIcon }).addTo(this.map);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setMarker(position.coords.latitude, position.coords.longitude),
        () => setMarker(30.0444, 31.2357) // fallback Cairo
      );
    } else {
      setMarker(30.0444, 31.2357);
    }
  }

  goToSearch() {
    this.router.navigate(['/search-doctor']);
  }
}
