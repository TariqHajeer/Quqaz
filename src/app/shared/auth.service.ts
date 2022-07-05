import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { UserLogin } from '../Models/userlogin.model';
export interface user {
  email: string;
  password: string;
}
export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private localStorageKey: string = 'kokazUser';
  private permissionlocalStorageKey: string = 'permissions';
  ngOnDestroy(): void {}

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private rout: Router
  ) {
    // this.startTokenTimer()
  }
  baseUrl = environment.baseUrl;
  signIn(user: user): Observable<any> {
    return this.http.post(this.baseUrl + 'api/EmployeeAuth', user);
  }

  signOut() {
    this.resetAuthenticated();
    localStorage.removeItem('token');
    localStorage.removeItem('kokazUser');
    this.rout.navigate(['/home']);
  }

  public get authenticatedUser(): any {
    var auth: any = this.localStorageService.getItem(this.localStorageKey);
    if (Object.keys(auth).length === 0 && auth.constructor === Object) {
      return null;
    } else {
      return auth;
    }
  }
  IsExpire() {
    var user = this.authenticatedUser;
  }

  register(credentials: ICreateCredentials) {}

  sendPasswordEmail(email) {}

  resetPassword(credentials: IPasswordReset) {}
  setAuthenticatedUser(userData: UserLogin) {
    this.localStorageService.setItem(this.localStorageKey, userData);
    this.setPermission(userData.privileges);
    this.startTokenTimer();
  }
  private resetAuthenticated(): void {
    this.localStorageService.removeItem(this.localStorageKey);
  }
  getUser() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) as UserLogin;
  }
  setPermission(permission) {
    localStorage.setItem(
      this.permissionlocalStorageKey,
      JSON.stringify(permission)
    );
  }
  getPermission() {
    return JSON.parse(localStorage.getItem(this.permissionlocalStorageKey));
  }
  hasPermission(permission) {
    if (permission) {
      let permissions = this.getPermission();
      return permissions.some((per) => per.sysName == permission);
    } else return false;
  }
  private getTokenRemainingTime() {
    const accessToken = this.authenticatedUser;
    if (!accessToken) {
      return 0;
    }
    return 60 * 60 * 1000 * 14;
  }
  public startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    setTimeout(() => {
      this.signOut();
    }, timeout);
  }
}
