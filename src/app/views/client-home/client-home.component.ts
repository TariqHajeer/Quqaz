import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/client-pages/service/home.service';
import { Store } from 'src/app/Models/store/store.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  constructor(private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private homeservice:HomeService) { }

  clientURL = environment.clientApp
  showMobileMenu = false;
  titleAR=environment.appNameAR
  titleEN=environment.appNameEN
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

  ngOnInit(): void {
    this.getMarket()
  }
  open = false
  isopen() {
    this.open = !(this.open)
  }
  chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }
  Markets:Store[]=[]
  baseUrl=environment.baseUrl
  getMarket(){
    this.homeservice.Market().subscribe(res => {
      this.Markets = res
      this.Markets=this.chunk(this.Markets,3)
    })
  }
  home() {
    this.router.navigate(['/home'])
  }
}
