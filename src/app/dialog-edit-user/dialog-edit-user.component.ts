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
  user = new User();
  userId!: string;
  birthDate!: Date;
  loading = false;
  firestore: Firestore = inject(Firestore);


  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.birthDate = new Date();
  }


  saveUser() {
    this.loading = true;
    setDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();      
    });
  }
}