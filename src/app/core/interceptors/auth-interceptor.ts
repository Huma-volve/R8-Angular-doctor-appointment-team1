// import { HttpInterceptorFn } from '@angular/common/http';

// // export const authInterceptor: HttpInterceptorFn = (req, next) => {
// //   return next(req);
// // };

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

