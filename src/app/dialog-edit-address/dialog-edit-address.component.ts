import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { Firestore, setDoc, doc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
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
    MatInputModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user = new User();
  userId!: string;
  loading = false;
  firestore: Firestore = inject(Firestore);


  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}


  saveUser() {
    this.loading = true;
    setDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();      
    });
  }
}