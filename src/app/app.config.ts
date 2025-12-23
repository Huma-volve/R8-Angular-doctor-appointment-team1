import { authInterceptor } from './core/interceptors/auth-interceptor';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch())
<<<<<<< HEAD
      ]
=======
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
>>>>>>> fce1b03dc5f50fb9c5f9e2b278115544e6ae8f2d
};
