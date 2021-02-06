import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of, Subscription } from 'rxjs';

import { getUserRole } from 'src/app/utils/util';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import {LocalStorageService} from '../services/local-storage.service'
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';
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
export class AuthService implements OnDestroy{
  private localStorageKey: string = 'kokazUser';
  private permissionlocalStorageKey: string = 'permissions';
  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }
  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
      //  this._user.next(null);
      }
      if (event.key === 'login-event') {
        this.startTokenTimer()
      }
    }
  }
  constructor(private http:HttpClient,private localStorageService:LocalStorageService,
    private rout:Router) {
      window.addEventListener('storage', this.storageEventListener.bind(this));
    }
  baseUrl=environment.baseUrl;
  signIn(user: user):Observable<any> {
    return this.http.post(this.baseUrl+'api/EmployeeAuth',user) ;
  }
  TestLogin(){
    this.http.get(this.baseUrl+"api/Default/Check").subscribe(res=>{
      return true;
    },err=>{
      this.rout.navigate(['/user/login']);
    })
  }

  signOut() {
    this.resetAuthenticated();
    this.rout.navigate(['user/login']);  
  }
  Test(){
    this.http.get(this.baseUrl+"api/Default/De").subscribe(res=>{
      console.log(res)
    });
  }
  public get authenticatedUser(): any {
    var auth: any = this.localStorageService.getItem(this.localStorageKey);
    if (Object.keys(auth).length === 0 && auth.constructor === Object) {
      return null;
    } else {
      return auth;
    }
  }
  IsExpire(){
    var user= this.authenticatedUser;
    
  }

  register(credentials: ICreateCredentials) {

  }

  sendPasswordEmail(email) {

  }

  resetPassword(credentials: IPasswordReset) {

  }
  setAuthenticatedUser(userData) {
    this.localStorageService.setItem(this.localStorageKey, userData);
    this.startTokenTimer()
  }
  private resetAuthenticated(): void {
    this.localStorageService.removeItem(this.localStorageKey);
  }
   getUser() {
  }
  setPermission(permission){
    localStorage.setItem( this.permissionlocalStorageKey,JSON.stringify(permission));

  }
  private getTokenRemainingTime() {
    const accessToken = this.authenticatedUser
    if (!accessToken) {
      return 0;
    }
    return 1 * 1 * 60 * 1000
  }
  private timer: Subscription;
  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime()
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.signOut())
      )
      .subscribe();
  }
  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }
}
