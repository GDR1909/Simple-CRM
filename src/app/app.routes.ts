import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


/**
 * Defines the application's routes, associating paths with components.
 * 
 * @type {Routes}
 */
export const routes: Routes = [
  /**
   * Default route that redirects to the DashboardComponent.
   * The path is set to an empty string, which matches the root URL.
   */
  { path: '', component: DashboardComponent },

  /**
   * Route for the dashboard view.
   * 
   * - Path: `/dashboard`
   * - Component: `DashboardComponent`
   */
  { path: 'dashboard', component: DashboardComponent },

  /**
   * Route for the user list view.
   * 
   * - Path: `/user`
   * - Component: `UserComponent`
   */
  { path: 'user', component: UserComponent },

  /**
   * Route for viewing details of a specific user.
   * The `:id` is a route parameter that represents the user's unique ID.
   * 
   * - Path: `/user/:id`
   * - Component: `UserDetailComponent`
   */
  { path: 'user/:id', component: UserDetailComponent }
];