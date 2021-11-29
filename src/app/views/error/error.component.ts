import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit,OnDestroy {
  adminRoot = '/app';

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    document.body.classList.add('background');
// setTimeout(() => {
//   this.goToPage()
// }, 5000);
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
    // this.goToPage()
  }
  // @HostListener('window:beforeunload')
  goToPage() {
    this.location.back()
    return false
  }
}
