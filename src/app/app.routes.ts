
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
import { Dcard } from './components/dcard/dcard';
import { Dmap } from './components/dmap/dmap';
import { Home } from './home/home';

import { SettingPopup } from './setting-popup/setting-popup';
import { Payment } from './payment/payment';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { AddNewCardComponent } from './add-new-card/add-new-card';
import { PasswordSetting } from './password-setting/password-setting';
import { Notification } from './notification/notification';
import { ProfilePopupComponent } from './profile-popup/profile-popup';

export const routes: Routes = [
   {path:'login',component:Login},
 { path: '', component:Home ,pathMatch: 'full',
  },

    {path:'notifications',component:Notification},
    {path:'ProfilePopup',component:ProfilePopupComponent},
    {path:'setting-popup',component:SettingPopup},
    {path:'passwordsetting',component:PasswordSetting},
    {path:'payment',component:Payment},
    {path:'privacy-policy',component:PrivacyPolicy},
    {path:'add-new-card',component:AddNewCardComponent},



import { Notfound } from './components/notfound/notfound';

export const routes: Routes = [
    { path: 'dcard', component: Dcard },
    { path: 'dmap', component: Dmap },
    { path: 'dcard/all', component: Dcard },
    { path: 'notifications', component: Notification },
    { path: 'profile-popup', component: ProfilePopup },
    { path: 'setting-popup', component: SettingPopup },
    { path: 'passwordsetting', component: PasswordSetting },
    { path: 'payment', component: Payment },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: 'add-new-card', component: AddNewCard },
    { path: '', component: Home },
    {path: '**', component: Notfound}

];
