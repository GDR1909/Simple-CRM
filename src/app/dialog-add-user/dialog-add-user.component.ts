import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user: User = new User(); // @type {User} - The user object to be created and saved.
  birthDate: Date; // @type {Date} - The birth date of the user.
  loading = false; // @type {boolean} - Flag indicating whether the form is currently saving data.
  firestore: Firestore = inject(Firestore); // @type {Firestore} - Firestore service for interacting with Firebase.


  /**
   * Reference to the dialog that opened this component.
   * 
   * @type {MatDialogRef<DialogAddUserComponent>}
   */
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    this.birthDate = new Date(); // Initialize birthDate with the current date.
  }


  /**
   * Saves the user data to Firestore.
   * 
   * Converts the `birthDate` to a timestamp and sets it in the `user` object.
   * Displays a loading indicator while saving and closes the dialog on success.
   * 
   * @returns {Promise<void>} A promise that resolves when the save operation is complete.
   */
  async saveUser() {
    this.user.birthDate = this.birthDate.getTime(); // Convert birthDate to a timestamp.
    console.log('Current user is:', this.user); // Log the user data to the console.
    this.loading = true; // Show loading indicator.

    await addDoc(this.getUsersRef(), this.user.toJSON()) // Add the user data to Firestore.
      .catch((err) => {
        console.log(err); // Log any errors to the console.
      })
      .then((docRef) => {
        console.log('Document written with ID:', docRef?.id); // Log the document ID on success.
        this.loading = false; // Hide loading indicator.
        this.dialogRef.close(); // Close the dialog.
      });
  }


  /**
   * Gets a reference to the Firestore 'users' collection.
   * 
   * @returns {CollectionReference} Reference to the 'users' collection in Firestore.
   */
  getUsersRef() {
    return collection(this.firestore, 'users'); // Return a reference to the 'users' collection.
  }
}