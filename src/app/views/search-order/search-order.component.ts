import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/client-pages/service/home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.scss']
})
export class SearchOrderComponent implements OnInit {

  constructor(private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private homeService: HomeService) { }
  clientURL = environment.clientApp
  showMobileMenu = false;
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
  }
  open = false
  isopen() {
    this.open = !(this.open)
  }
  Code: string = ""
  ClientNumber: string = ""
  orders: any[] = []
  notFound = false
  formVisble = true
  carback = false
  showordercar = false
  multiordercar = false
  getOrder() {
    this.formVisble = false
    this.notFound = false
    this.carback = true
    this.multiordercar = false
    this.showordercar = false
    this.homeService.TrackOrder(this.Code, this.ClientNumber).subscribe(res => {
      this.orders = res
      setTimeout(() => {
        this.carback = false
        if (this.orders.length == 0)
          this.notFound = true
        else
          this.notFound = false
        if (this.orders.length == 1)
          this.showordercar = true
        else
          this.showordercar = false
        if (this.orders.length > 1)
          this.multiordercar = true
        else
          this.multiordercar = false
      }, 1500);
      // if(!this.ClientNumber&&this.orders.length>1)
      // this.orders=[]
      // else this.orders=res
    },
      err => {
        this.formVisble = true
        this.notFound = false
        this.carback = false
        this.multiordercar = false
        this.showordercar = false

      })
  }
  more() {
    this.carback = true
    this.formVisble = false
    this.notFound = false
    this.multiordercar = false
    this.showordercar = false
    setTimeout(() => {
      this.formVisble = true
      this.carback = false
      this.orders = []
      this.Code = ""
      this.ClientNumber = ""
    }, 1500);
  }
  home() {
    this.router.navigate(['/home'])
  }
}
