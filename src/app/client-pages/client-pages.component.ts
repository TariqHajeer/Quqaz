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
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    const homeRect = this.elRef.nativeElement
      .querySelector(".home-row")
      .getBoundingClientRect();

    const homeSection = this.elRef.nativeElement.querySelector(
      ".landing-page .section.home"
    );
    homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";

    const footerSection = this.elRef.nativeElement.querySelector(
      ".landing-page .section.footer"
    );
    footerSection.style.backgroundPositionX = event.target.innerWidth - homeRect.x - 2000 + "px";

    if (event.target.innerWidth >= 992) {
      this.renderer.removeClass(
        this.elRef.nativeElement.querySelector(".landing-page"),
        "show-mobile-menu"
      );
    }
  }
  showMobileMenu = false;

  @HostListener("window:click", ["$event"])
  onClick(event) {
    this.showMobileMenu = false;
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event) {
    this.showMobileMenu = false;
  }

  scrollTo(target) {
    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };

    this.scrollToService.scrollTo(config);
  }
  login() {
    this.router.navigate(['/login'])
  }
}
