import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { getUserRole } from 'src/app/utils/util';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import {LocalStorageService} from '../services/local-storage.service'
import { Router } from '@angular/router';
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
export class AuthService {
  private localStorageKey: string = 'kokazUser';
  private permissionlocalStorageKey: string = 'permissions';


  constructor(private http:HttpClient,private localStorageService:LocalStorageService,
    private rout:Router) {}
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

  register(credentials: ICreateCredentials) {

  }

  sendPasswordEmail(email) {

  }

  resetPassword(credentials: IPasswordReset) {

  }
  setAuthenticatedUser(userData) {
    this.localStorageService.setItem(this.localStorageKey, userData);
  }
  private resetAuthenticated(): void {
    this.localStorageService.removeItem(this.localStorageKey);
  }
   getUser() {
  }
  setPermission(permission){
    localStorage.setItem( this.permissionlocalStorageKey,JSON.stringify(permission));

  }
}
