import { Routes } from '@angular/router';
import { AppointmentPageComponent } from './features/appointment/pages/appointment-page/appointment-page';

export const routes: Routes = [
  { path: 'appointment/:doctorId', component: AppointmentPageComponent },
  { path: '', redirectTo: 'appointment/5', pathMatch: 'full' } // مؤقت للتجربة
];
