import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


/**
 * Bootstraps the Angular application with the root component `AppComponent`.
 * 
 * @param {Type<any>} AppComponent - The root component of the application.
 * @param {ApplicationConfig} appConfig - The configuration for the application.
 * @returns {Promise<ApplicationRef>} A promise that resolves when the application is bootstrapped.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));