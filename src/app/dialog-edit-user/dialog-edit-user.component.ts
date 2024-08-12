import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { Firestore, setDoc, doc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogContent,
    FormsModule,
    MatFormField,
    MatHint,
    MatLabel,
    MatInput,
    MatInputModule,
    MatNativeDateModule,
    MatDatepicker,
    MatDatepickerModule,
    MatDatepickerToggle
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user = new User(); // The user object being edited.
  userId!: string; // The ID of the user being edited.
  birthDate!: Date; // The selected birth date of the user.
  loading = false; // Indicates if the form is currently loading.
  firestore: Firestore = inject(Firestore); // Firestore instance for database operations.


  /**
   * Constructs the `DialogEditUserComponent` with dependency injection for Firestore and dialog reference.
   * @param dialogRef - Reference to the dialog instance for closing it.
   */
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.birthDate = new Date();
  }


  /**
   * Saves the updated user information to Firestore.
   * Sets the user's birth date and updates the Firestore document with the given user ID.
   * Closes the dialog once the save operation is complete.
   */
  saveUser() {
    this.loading = true;
    setDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();      
    });
  }
}