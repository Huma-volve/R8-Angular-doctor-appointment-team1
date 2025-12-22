import { Api } from './api';
import { User, userLoginResponse } from './../models/user';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  api = inject(Api)

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

  // user profile page 
  getProfile()
  {
    return this.http.get(this.api.API_URL + '/profile/show');
  }
  editProfile(userData: any) {
    return this.http.put(this.api.API_URL + '/profile/edit', userData);
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
}
