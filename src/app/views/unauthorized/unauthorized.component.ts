import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit, OnDestroy {
  adminRoot = '/app/HomePage/start';

  constructor() { }

  ngOnInit() {
    document.body.classList.add('background');
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
  }

}
