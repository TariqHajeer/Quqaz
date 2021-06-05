import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit, OnDestroy {
  adminRoot = '/app/HomePage/start';

  constructor() { }
prv=[]
  ngOnInit() {
    document.body.classList.add('background');
   this.prv=JSON.parse(localStorage.getItem('route')) as any
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
  }

}
