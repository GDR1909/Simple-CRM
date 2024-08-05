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
import { Observable } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  user: User = new User();
  allUsers: User[] = [];
  unsubUserList;
  public dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);


  constructor() {
    this.unsubUserList = this.subUserList();
  }


  subUserList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        console.log(element.data());
        let userData = {
          ...element.data(),
          id: element.id
        }
        this.allUsers.push(new User(userData));
      });
      console.log(this.allUsers);
      this.cdr.markForCheck();  // Manuell die Change Detection auslösen
    })
  }


  getUsersRef() {
    return collection(this.firestore, 'users');
  }


  ngOnDestroy() {
    this.unsubUserList;
  }


  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}