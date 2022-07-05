import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  convertUTCToDate(date) {
    if(date)
    return  moment.utc(date).local().format();
  }
}
