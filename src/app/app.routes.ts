
import { Routes } from '@angular/router';
import { Dcard } from './components/dcard/dcard';
import { Dmap } from './components/dmap/dmap';
import { Home } from './home/home';
import { ProfilePopup } from './profile-popup/profile-popup';
import { SettingPopup } from './setting-popup/setting-popup';
import { Payment } from './payment/payment';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { AddNewCard } from './add-new-card/add-new-card';
import { PasswordSetting } from './password-setting/password-setting';
import { Notification } from './notification/notification';
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
