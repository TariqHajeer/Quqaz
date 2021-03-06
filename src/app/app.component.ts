import { Component, OnInit, Renderer2, AfterViewInit, Injector } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { throwError as observableThrowError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = true;
  constructor(private langService: LangService, private renderer: Renderer2,
    private location: Location,private injector: Injector,
    private authService: AuthService, private _router: Router) {

  }
  logoutUser() {
    const authService = this.injector.get(AuthService);
    localStorage.removeItem('token') 
    authService.signOut();
    return observableThrowError("");
  }
  ngOnInit() {
    this.langService.init();
    //this.authService.
    if(localStorage.getItem('kokazUser')==null||localStorage.getItem('kokazUser')==undefined||localStorage.getItem('kokazUser')=='')
    return this._router.navigate(['/user/login']);
    // this.authService.TestLogin();
    var user = this.authService.authenticatedUser
    if (user == null || (user.expiry && (new Date().getTime() - user.expiry > 7 * 60 * 60 * 1000))) {
      localStorage.removeItem('kokazUser')
      localStorage.removeItem('token')
      return this.logoutUser();
    }

    let requestedUrl = this.location.path();


    if (Object.keys(this.authService.authenticatedUser).length === 0 && this.authService.authenticatedUser.constructor === Object) {
      this._router.navigate(['']);
    }
    else if (requestedUrl == '') {
      this._router.navigate(['app/HomePage']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.addClass(document.body, 'show');
    }, 1000);
    setTimeout(() => {
      this.renderer.addClass(document.body, 'default-transition');
    }, 1500);
  }
}
