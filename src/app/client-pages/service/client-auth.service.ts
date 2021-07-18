import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ICreateCredentials, IPasswordReset } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {

  constructor(private http:HttpClient,private localStorageService:LocalStorageService,
    private rout:Router) {
     // this.startTokenTimer()
    }
    baseUrl=environment.baseUrl+"api/ClientAuth/";
  signIn(user):Observable<any> {
    return this.http.post(this.baseUrl,user) ;
  }
  private localStorageKey: string = 'kokazUser';
  private permissionlocalStorageKey: string = 'permissions';
  ngOnDestroy(): void {
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
    localStorage.removeIte("kokazUser");
    //localStorage.clear();
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
    return  60 * 60 * 1000 *14
  }
  public startTokenTimer() {
    const timeout = this.getTokenRemainingTime()
    console.log("timeout");
    console.log(timeout);
    setTimeout(() =>{alert('log out'); this.signOut();},  timeout)
   
  }
}
