import {AuthService } from './../services/auth';
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
    const auth = inject(AuthService);
    const token = auth.getToken();

   if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    
  return next(req);
}

  return next(req);
};


