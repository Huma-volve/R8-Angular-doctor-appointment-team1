import { ForgetPassword } from './features/auth/pages/forget-password/forget-password';
import { EditPhone } from './features/auth/pages/edit-phone/edit-phone';
import { authGuard } from './core/guards/auth-guard';
import { ProfilePage } from './features/profile-page/profile-page';
import { Otp } from './features/auth/pages/otp/otp';
import { Register } from './features/auth/pages/register/register';
import { Login } from './features/auth/pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Routes } from '@angular/router';
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




];
