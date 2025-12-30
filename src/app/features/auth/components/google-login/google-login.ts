import { Router } from '@angular/router';
import { Api } from './../../../../core/services/api';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, Input } from '@angular/core';

import { AuthService } from './../../../../core/services/auth';

@Component({
  selector: 'app-google-login',
  imports: [],
  templateUrl: './google-login.html',
  styleUrl: './google-login.scss',
})
export class GoogleLogin {

   authService = inject(AuthService);
   router = inject(Router)
     @Input() label!: string;
  login() {
  this.authService.loginWithGoogle()
    .then((res:any) => {
      console.log(res.user); // login أو register تلقائي
      this.authService.setToken(res.user.accessToken);
      this.router.navigate(['/profile-details']);
    });
}

   
}
