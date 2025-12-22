import { DoctorList } from './features/doctors/pages/doctor-list/doctor-list';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ForgetPassword } from './features/auth/pages/forget-password/forget-password';
import { EditPhone } from './features/auth/pages/edit-phone/edit-phone';
import { authGuard } from './core/guards/auth-guard';
import { ProfilePage } from './features/profile-page/profile-page';
import { Otp } from './features/auth/pages/otp/otp';
import { Register } from './features/auth/pages/register/register';
import { Login } from './features/auth/pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        component:AuthLayout,
        children:[
             {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
            {
                path:'login',
                component:Login
            },
            {
               path:'register',
                component:Register 
            },
            {
                path:'otp',
                component:Otp
            },
              {
                path:'editPhone',
                component:EditPhone
            },
              {
                path:'forgetPassword',
                component:ForgetPassword
            },

        ]
    },
    {
         path:'admin',
        component:AdminLayout,
        canActivate: [authGuard],
        children:[
            {
                path:'doctor-list',
                component:DoctorList
            },
{
        path:'profile-details', 
        component:ProfilePage
    }
        ]
    },
   
    {
        path:'**',
        redirectTo:'/login'
    }
];
