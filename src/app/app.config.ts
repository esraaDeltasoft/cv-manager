import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
// };
export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes), 
// provideClientHydration(),provideHttpClient()]
providers: [
  provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(),
  provideAnimations(), // Enable animations
  provideToastr({ // Toastr configuration (optional)
    timeOut: 3000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true,
    progressBar: true,
  }),
],
};