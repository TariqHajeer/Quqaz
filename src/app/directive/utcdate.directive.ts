import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[UTCDate]'
})
export class UTCDateDirective {
@Input() date;
  constructor() { 
    this.date=new Date(this.date);
  }

}
