import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CdkScrollable,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Use OnPush change detection strategy for performance optimization.
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right']; // @type {TooltipPosition[]} - Tooltip position options for the user interface.
  position = new FormControl(this.positionOptions[1]); // @type {FormControl} - Form control for selecting the tooltip position.
  user: User = new User(); // @type {User} - The current user object.
  allUsers: User[] = []; // @type {User[]} - List of all users.
  unsubUserList; // @type {Function} - Subscription to the Firestore user list.
  public dialog = inject(MatDialog); // @type {MatDialog} - Angular Material dialog service.
  firestore: Firestore = inject(Firestore); // @type {Firestore} - Firestore service for interacting with Firebase.
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef); // @type {ChangeDetectorRef} - Change detector reference for manually triggering change detection.


  /**
   * Initializes the UserComponent and subscribes to the user list.
   */
  constructor() {
    this.unsubUserList = this.subUserList();
  }


  /**
   * Subscribes to the Firestore collection of users and updates the `allUsers` array.
   * 
   * @returns {Function} Unsubscribe function for the user list subscription.
   */
  subUserList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        console.log(element.data()); // Log the user data to the console.
        let userData = {
          ...element.data(),
          id: element.id
        }
        this.allUsers.push(new User(userData)); // Add new User instances to the list.
      });
      console.log(this.allUsers); // Log the updated list of users.
      this.cdr.markForCheck(); // Manually trigger change detection to update the view.
    })
  }


  /**
   * Gets a reference to the Firestore 'users' collection.
   * 
   * @returns {CollectionReference} Reference to the 'users' collection in Firestore.
   */
  getUsersRef() {
    return collection(this.firestore, 'users');
  }


  /**
   * Cleans up resources and unsubscribes from the user list when the component is destroyed.
   */
  ngOnDestroy() {
    this.unsubUserList; // Call the unsubscribe function to clean up the Firestore subscription.
  }


  /**
   * Opens a dialog to add a new user.
   */
  openDialog() {
    this.dialog.open(DialogAddUserComponent); // Open the DialogAddUserComponent as a dialog.
  }
}