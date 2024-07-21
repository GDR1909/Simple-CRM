import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-crm-6a7bf',
          appId: '1:181502240325:web:0678de58fceb851f51252c',
          storageBucket: 'simple-crm-6a7bf.appspot.com',
          apiKey: 'AIzaSyBzs2-yWO9E2tDOwjNVp8h7TEpFoqoqthc',
          authDomain: 'simple-crm-6a7bf.firebaseapp.com',
          messagingSenderId: '181502240325',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
