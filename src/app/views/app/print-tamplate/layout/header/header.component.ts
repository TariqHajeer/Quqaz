import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }
  @Input()  RecipientPhone="07700890880"
  NotificationsPhone="07714400880"
  instgram="quqaz.fast"
  facebook="القوقز للتوصيل السريع"
  email="info@quqaz.com"
  location="اربيل - شارع 100 - قرب مطغم today"
  ngOnInit(): void {
  }

}
