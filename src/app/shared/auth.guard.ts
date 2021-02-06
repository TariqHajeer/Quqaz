import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserLogin } from '../Models/userlogin.model';
import { UserPermission } from './auth.roles';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }
  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let currentUser: any = this.authService.authenticatedUser;

    if (currentUser) {
      if (route.data && route.data.roles) {
        if (route.data.roles.includes(currentUser.role)) {
          return true;
        } else {
          // this.router.navigate(['/unauthorized']);
          this.router.navigate(['/user/login']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser: any = JSON.parse(this.authService.authenticatedUser) as UserLogin;
    if (currentUser) {
      if (route.data && route.data.roles) {
        if (route.data.roles.filter(p => currentUser.privileges.map(p => p.sysName).includes(p)).length > 0) {
          console.log("true")
          return true;
        } else {
          console.log("false")
          //this.router.navigate(['/user/login']);
           this.router.navigate(['/unauthorized']);
          // return false;
          return false
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
