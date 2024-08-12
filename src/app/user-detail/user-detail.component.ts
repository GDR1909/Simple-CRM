import { Component, inject } from '@angular/core';
import { Firestore, onSnapshot, doc, collection } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: any = ''; // ID of the user retrieved from route parameters.
  user: User = new User(); // Instance of the User class to hold user details.
  firestore: Firestore = inject(Firestore); // Firestore service instance for database operations.
  public dialog = inject(MatDialog); // Dialog service for opening dialog components.


  /**
   * Constructor to initialize the component.
   * @param route ActivatedRoute service to access route parameters.
   */
  constructor(private route: ActivatedRoute) {
    // Subscribe to route parameters to get the user ID from the URL and fetch user data.
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('GOT ID:', this.userId);
      this.getUser();
    });
  }


  /**
   * Fetches user details from Firestore and updates the `user` property.
   */
  getUser() {
    onSnapshot(doc(collection(this.firestore, 'users'), this.userId), ((user) => {
      this.user = new User(user.data());
      console.log('Retrieved user:', this.user);
    }));
  }


  /**
   * Opens a dialog to edit user details.
   */
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    // Pass the current user details and ID to the dialog component.
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }


  /**
   * Opens a dialog to edit user address.
   */
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    // Pass the current user details and ID to the dialog component.
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}