import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of, Subscription } from 'rxjs';

import { getUserRole } from 'src/app/utils/util';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import {LocalStorageService} from '../services/local-storage.service'
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';
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
export class AuthService implements OnDestroy{
  private localStorageKey: string = 'kokazUser';
  private permissionlocalStorageKey: string = 'permissions';
  ngOnDestroy(): void {
  }
 
  constructor(private http:HttpClient,private localStorageService:LocalStorageService,
    private rout:Router) {
     // this.startTokenTimer()
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
    localStorage.removeItem('token')
    this.rout.navigate(['user/login']);  
  }
  Test(){
    this.http.get(this.baseUrl+"api/Default/De").subscribe(res=>{
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
    return 1 * 60 * 60 * 1000
  }
  public startTokenTimer() {
    const timeout = this.getTokenRemainingTime()
    setTimeout(() =>this.signOut(),  timeout)
   
  }
 
}
