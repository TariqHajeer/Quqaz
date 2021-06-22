import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-client-pages',
  templateUrl: './client-pages.component.html',
  styleUrls: ['./client-pages.component.scss']
})
export class ClientPagesComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private elRef: ElementRef, private scrollToService: ScrollToService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  login() {
    this.router.navigate(['/login'])
  }
}
