import { Routes } from '@angular/router';
import { AppointmentPageComponent } from './features/appointment/pages/appointment-page/appointment-page';
import { PaymentPageComponent } from './features/payment/payment-page.component/payment-page.component';
import { AppointmentSuccessModalComponent } from './features/modal/appointment-success-modal.component/appointment-success-modal.component';
import { RateReviewComponent } from './features/Rate/rate-review.component/rate-review.component';

export const routes: Routes = [
  { path: 'appointment/:doctorId', component: AppointmentPageComponent },
  { path: 'payment-page/:doctorId' , component: PaymentPageComponent},
  { path: 'modal' , component:AppointmentSuccessModalComponent},
  { path: 'rate/:doctorId' ,component:RateReviewComponent },
  { path: '', redirectTo: 'appointment/5', pathMatch: 'full' } // مؤقت للتجربة
];
