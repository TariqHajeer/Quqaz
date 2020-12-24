import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit, OnDestroy {
  adminRoot = '/app';

  constructor() { }

  ngOnInit() {
    document.body.classList.add('background');
  }

  ngOnDestroy() {
    document.body.classList.remove('background');
  }

}
