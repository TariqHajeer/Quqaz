import {  Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private elRef: ElementRef,
    private scrollToService: ScrollToService,
    private router: Router) { }

  showMobileMenu = false;
  user
  isLogin = false
  ngOnInit() {
    this.renderer.addClass(document.body, "no-footer");
    if (localStorage.getItem('kokazUser')) {
      this.user = JSON.parse(localStorage.getItem('kokazUser'))
      this.isLogin = true
    }
    else this.isLogin = false
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, "no-footer");
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
    this.router.navigate(['/user/login'])
  }
  clientURL = environment.clientApp
  loginclient() {
    this.router.navigateByUrl(this.clientURL)
  }
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('kokazUser')
    this.isLogin = false
    this.router.navigate(['/home'])
  }
}
