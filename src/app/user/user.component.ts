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
import { Firestore, collection, doc, collectionData, onSnapshot, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  user: User = new User();
  firestore: Firestore = inject(Firestore);
  unsub;
  allUsers: User[] = [];
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  

  constructor(public dialog: MatDialog) {
    this.unsub = onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = [];  // Reset the array to avoid duplicate entries
      list.forEach((element) => {
        console.log(element.data());
        this.allUsers.push(element.data() as User);
      });
      console.log(this.allUsers);
      this.cdr.markForCheck();  // Manuell die Change Detection auslösen
    });
  }


  ngOnDestroy() {
    this.unsub();
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}