import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(  public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
showSpinner(){
  this.spinner.show()
}
hideSpinner(){
  this.spinner.hide()
}
}
