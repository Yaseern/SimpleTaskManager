import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth-store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskForm } from './features/task-form/task-form';
import { TaskList } from './features/task-list/task-list';
import { CommonModule } from '@angular/common';
import { Layout } from './layout/layout';
import { getSession } from './shared/utils';
import { SessionKeys } from './shared/constant';
import { UserProfile } from './core/user-profile';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const storedUser = getSession<UserProfile>(SessionKeys.userAuth);
    if (storedUser?.username) {
      this.auth.setCredentials(storedUser.username, storedUser.password);
      this.isLoggedIn = true;
    }
  }

  login() {
    this.auth.setCredentials(this.username, this.password);
    this.isLoggedIn = true;
  }
}
