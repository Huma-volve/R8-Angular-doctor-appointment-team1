import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { Footer } from "./shared/footer/footer";

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
   protected readonly title = signal('doctor-appointment-team1');
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !event.url.includes('notifications');
      }
    });
  }
}
