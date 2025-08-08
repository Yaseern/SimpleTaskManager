import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth-store';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Layout } from './layout/layout';
import { clearSession, getSession } from './shared/utils';
import { SessionKeys } from './shared/constant';
import { UserProfile } from './core/user-profile';
import { MatCardModule } from '@angular/material/card';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  username = '';
  password = '';
  isLoggedIn = false;
  loginValid = true;

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

    this.auth.pingRoot()
      .pipe(take(1))
      .subscribe({
        next: (text) => {
          this.isLoggedIn = true;
        }, error: (err: HttpErrorResponse) => {
          console.log(err);
          this.loginValid = false;
          clearSession()
        }
      })
  }
}
