import { Component, OnInit, Renderer2, AfterViewInit, Injector } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { throwError as observableThrowError } from 'rxjs';
import { GroupService } from './services/group.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = true;
  constructor(private langService: LangService, private renderer: Renderer2,
    private location: Location, private injector: Injector,
    private authService: AuthService, private _router: Router,
    private groupService: GroupService) {

  }
  
  ngOnInit() {
   
    this.langService.init();
    let requestedUrl = this.location.path();
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
