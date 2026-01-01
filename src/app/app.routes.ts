import { ForgetPassword } from './features/auth/pages/forget-password/forget-password';
import { EditPhone } from './features/auth/pages/edit-phone/edit-phone';
import { authGuard } from './core/guards/auth-guard';
import { ProfilePage } from './features/profile-page/profile-page';
import { Otp } from './features/auth/pages/otp/otp';
import { Register } from './features/auth/pages/register/register';
import { Routes } from '@angular/router';
// import { AppointmentPageComponent } from './features/appointment/pages/appointment-page/appointment-page';
// import { PaymentPageComponent } from './features/payment/payment-page.component/payment-page.component';
// import { AppointmentSuccessModalComponent } from './features/modal/appointment-success-modal.component/appointment-success-modal.component';
// import { RateReviewComponent } from './features/Rate/rate-review.component/rate-review.component';
// import { Dcard } from './components/dcard/dcard';
// import { Dmap } from './components/dmap/dmap';
// import { Home } from './home/home';
// import { SettingPopup } from './setting-popup/setting-popup';
// import { Payment } from './payment/payment';
// import { PrivacyPolicy } from './privacy-policy/privacy-policy';
// import { AddNewCardComponent } from './add-new-card/add-new-card';
// import { PasswordSetting } from './password-setting/password-setting';
// import { Notification } from './notification/notification';
// import { ProfilePopupComponent } from './profile-popup/profile-popup';
import { Login } from './features/auth/pages/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';


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
        path:'profile-details', 
        canActivate: [authGuard],
        component:ProfilePage
    },
    {
        path:'**',
        redirectTo:'/login'
    }
];
