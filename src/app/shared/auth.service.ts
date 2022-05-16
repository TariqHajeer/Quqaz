import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
      this.rout.navigate(['/home']);
    })
  }

  signOut() {
    this.resetAuthenticated();
    localStorage.removeItem('token')
    localStorage.removeItem("kokazUser");
    //localStorage.clear();
    this.rout.navigate(['/home']);  
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
    return  60 * 60 * 1000 *14
  }
  public startTokenTimer() {
    const timeout = this.getTokenRemainingTime()
    // console.log("timeout");
    // console.log(timeout);
    setTimeout(() =>{alert('log out'); this.signOut();},  timeout)
   
  }
 
}
