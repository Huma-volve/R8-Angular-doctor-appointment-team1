import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full',
  },
  {
    path: 'appointments',
    loadChildren: () =>
      import('./features/appointment/appointment.routes')
        .then(m => m.APPOINTMENT_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'appointments',
  },
];
