import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  var baseUrl = 'https://round8-backend-team-one.huma-volve.com/api/'
  var Token = localStorage.getItem('token')
  // var Token = '31|mkPtbecm1nkETShX7b8zsY5LE5PCNPB88r2zNOG47b24c466'

   const myReq = req.clone({
    url: baseUrl + req.url,
    setHeaders: Token
      ? { Authorization: `Bearer ${Token}` }
      : {},
  });
  return next(myReq)
};
