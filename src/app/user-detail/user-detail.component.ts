import { Component, inject } from '@angular/core';
import { Firestore, onSnapshot, doc, collection } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: any = '';
  user: User = new User();
  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('GOT ID:', this.userId);
      this.getUser();
    });
  }


  getUser() {
    onSnapshot(doc(collection(this.firestore, 'users'), this.userId), ((user) => {
      this.user = new User(user.data());
      console.log('Retrieved user:', this.user);
    }));
  }


  editUserDetail() {
    
  }


  editMenu() {
    
  }
}