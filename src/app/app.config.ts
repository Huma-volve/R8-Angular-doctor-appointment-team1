import { authInterceptor } from './core/interceptors/auth-interceptor';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
     provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAHweqTsOXRSjvY-3_XrzMQmqf3J_Bt6bs',
        authDomain: 'cure-b5b8c.firebaseapp.com',
        projectId: "cure-b5b8c",
        storageBucket: "cure-b5b8c.firebasestorage.app",
        messagingSenderId: "494725645246",
        appId: "1:494725645246:web:ce2d66807e73fb16296fef"
      })
    ),
    provideAuth(() => getAuth())

  ]
};
