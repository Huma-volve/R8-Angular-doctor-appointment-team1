import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dcard } from './components/dcard/dcard';
import { Dmap } from './components/dmap/dmap';
import { Notfound } from './components/notfound/notfound';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dcard, Dmap, Notfound],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('doctor-appointment-team1');
}
