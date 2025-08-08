import { Injectable } from '@angular/core';
import { UserProfile } from './user-profile';
import { storeSession } from '../shared/utils';
import { SessionKeys } from '../shared/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: UserProfile | undefined;
  readonly baseDomain = 'https://localhost:7178/';

  constructor(private http: HttpClient) { }

  setCredentials(username: string, password: string) {
    this.user = { username, password };
    storeSession(SessionKeys.userAuth, JSON.stringify(this.user))
  }

  getAuthHeader(): string {
    if (!this.user) {
      return "";
    }
    return 'Basic ' + btoa(`${this.user.username}:${this.user.password}`);
  }

  pingRoot() {
    return this.http.get<string>(this.baseDomain, { headers: new HttpHeaders({ Authorization: this.getAuthHeader() }) });
  }
}
