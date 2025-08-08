import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile';
import { storeSession } from '../shared/utils';
import { SessionKeys } from '../shared/constant';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: UserProfile | undefined;

  setCredentials(username: string, password: string) {
    this.user = { username, password };
    storeSession(SessionKeys.userAuth, JSON.stringify(this.user))
  }

  getAuthHeader(): string {
    if(!this.user) {
      return "";
    }
    return 'Basic ' + btoa(`${this.user.username}:${this.user.password}`);
  }
}
