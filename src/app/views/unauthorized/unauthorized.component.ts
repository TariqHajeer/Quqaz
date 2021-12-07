import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit, OnDestroy {
  adminRoot = '/app/HomePage/start';

  constructor(private location: Location, private router: Router) { }
  prv = []
  ngOnInit() {
    document.body.classList.add('background');
    if (localStorage.getItem('route'))
      this.prv = JSON.parse(localStorage.getItem('route')) as any
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
    // this.goToPage()
  }
  // @HostListener('window:beforeunload')
  goToPage() {
    // console.log("goo")
    this.location.back()
    this.location.back()
    return false
  }
  goToLogin() {
    this.router.navigate(['/user/login'])
  }
}
