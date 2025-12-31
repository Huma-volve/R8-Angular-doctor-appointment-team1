import { Api } from './api';
import { User, userLoginResponse } from './../models/user';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  api = inject(Api)
  authGoogle = inject(Auth)

   private _token:string = localStorage.getItem('token') || '';

   isAuthenticated(): boolean {
      return !!this._token;
   }
   setToken(token:string){
      this._token = token;
      localStorage.setItem('token', token);
   }
   getToken(): string | null {
    return this._token;
  }
  
  register(userData: User) {
    return this.http.post(this.api.API_URL + '/auth/register', userData);
  }
  verifyOtp(otpData: any) {
    return this.http.post(this.api.API_URL + '/auth/verify-otp', otpData);
  }
  resendOtp(phoneData: any) {
    phoneData = { phone: localStorage.getItem('user_phone') || ''};
    return this.http.post(this.api.API_URL + '/auth/resend-otp', phoneData);
  }
  login(userData: userLoginResponse) {
    return this.http.post(this.api.API_URL + '/auth/login', userData);
  }

  getProfile()
  {
    return this.http.get(this.api.API_URL + '/profile/show');
  }
  editProfile(userData: any) {
    return this.http.post(this.api.API_URL + '/profile/edit', userData);
  }
  // change password
  changePassword(passwordData: any) {
    return this.http.put(this.api.API_URL + '/profile/change-password', passwordData);
  }

  forgetPassword(phoneNumber:any)
  {
    return this.http.post(this.api.API_URL+'/auth/forget-password',phoneNumber);
  }
   logout(){
      this._token = '';
      localStorage.removeItem('token');
   }

     loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.authGoogle, provider);
  }
}
