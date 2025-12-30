import { Router } from '@angular/router';
import { AuthService } from './../services/auth';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
   const router = inject(Router);
  console.log('TOKEN:', auth.getToken());
   if(auth.isAuthenticated()){
      return true;
   }
  return router.createUrlTree(['/auth/login']);
};

