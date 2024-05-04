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
import { GroupService } from '../services/group.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router,
    private groupService: GroupService) { }
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
          return true;
        } else {
          this.groupService.GetPrivileges().subscribe(res => {
            var pr = res.filter(p => route.data.roles.filter(r => p.sysName == r).length > 0)
            localStorage.setItem('route', JSON.stringify(pr))
            var user = localStorage.getItem('user')
            if (user == 'client')
              this.router.navigate(['/user/login']);
            else if (user == 'employee')
              this.router.navigate(['/unauthorized']);
          })
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
