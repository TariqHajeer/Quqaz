import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }
  RecipientPhone=""
  NotificationsPhone="07714400880"
  instgram="quqaz.fast"
  facebook="القوقز للتوصيل السريع"
  email="info@quqaz.com"
  location=""
  ngOnInit(): void {
  }

}
