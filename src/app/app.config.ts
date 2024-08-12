import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


/**
 * The application configuration object, used to set up providers for the Angular app.
 * This configuration includes routing, client hydration, animations, and Firebase integration.
 * 
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // @see {@link routes} - Provides the application's routing configuration.
    provideClientHydration(), // Enables client-side hydration for server-side rendered Angular applications.
    provideAnimationsAsync(), // Provides asynchronous support for Angular animations.
    importProvidersFrom( // Imports Firebase and Firestore providers using AngularFire. This includes the two following points:
      provideFirebaseApp(() => //  Initialization of Firebase with the project's credentials.
        initializeApp({ // Provision of Firestore services for the app.
          projectId: 'simple-crm-6a7bf',
          appId: '1:181502240325:web:0678de58fceb851f51252c',
          storageBucket: 'simple-crm-6a7bf.appspot.com',
          apiKey: 'AIzaSyBzs2-yWO9E2tDOwjNVp8h7TEpFoqoqthc',
          authDomain: 'simple-crm-6a7bf.firebaseapp.com',
          messagingSenderId: '181502240325',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())), // Provides Firestore services to the application.
  ],
};