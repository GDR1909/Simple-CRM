import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';


/**
 * Configuration specific to server-side rendering (SSR) for the Angular application.
 * 
 * @type {ApplicationConfig}
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // Provides server-side rendering support for the Angular application.
  ]
};


/**
 * Merges the client-side application configuration with the server-side configuration.
 * 
 * This merged configuration is used when the application is running on the server.
 * 
 * @type {ApplicationConfig}
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);