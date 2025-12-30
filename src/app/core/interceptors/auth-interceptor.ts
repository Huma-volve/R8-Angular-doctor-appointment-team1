import {AuthService } from './../services/auth';
// import { HttpInterceptorFn } from '@angular/common/http';

// // export const authInterceptor: HttpInterceptorFn = (req, next) => {
// //   return next(req);
// // };
import { Auth } from './../services/auth';
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

// export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
//   // عدّل key لو التوكن عندك باسم مختلف
//   const token = localStorage.getItem('token');

//   if (!token) return next(req);

//   return next(
//     req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//       },
//     })
//   );
// };

