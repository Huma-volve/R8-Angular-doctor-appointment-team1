import { authInterceptor } from './core/interceptors/auth-interceptor';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';

 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
    provideHttpClient(withFetch())
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};
