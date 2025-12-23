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

export const routes: Routes = [
  { path: 'dcard', component: Dcard },
  { path: 'dmap', component: Dmap },
  { path: 'dcard/all', component: Dcard },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'otp',
        component: Otp,
      },
      {
        path: 'editPhone',
        component: EditPhone,
      },
      {
        path: 'forgetPassword',
        component: ForgetPassword,
      },
    ],
  },
  {
    path: 'profile-details',
    canActivate: [authGuard],
    component: ProfilePage,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
