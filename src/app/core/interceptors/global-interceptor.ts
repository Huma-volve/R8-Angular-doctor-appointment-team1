import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  var baseUrl = 'https://round8-backend-team-one.huma-volve.com/api/'
  // var Token = localStorage.getItem('UserToken')
  var Token = '91|3PCID1g4Z5zggIwkI4rZnVAECKcvqPGogDBW6KmB95ec9023'

   const myReq = req.clone({
    url: baseUrl + req.url,
    setHeaders: Token
      ? { Authorization: `Bearer ${Token}` }
      : {},
  });
  return next(myReq)
};
