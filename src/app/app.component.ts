import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = true;
  constructor(private langService: LangService, private renderer: Renderer2,
    private location: Location,
    private authService: AuthService, private _router: Router) {

  }

  ngOnInit() {
    this.langService.init();
    // if(localStorage.getItem('kokazUser')==null||localStorage.getItem('kokazUser')==undefined||localStorage.getItem('kokazUser')=='')
    // return this._router.navigate(['/user/login']);
    // this.authService.TestLogin();
    

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
