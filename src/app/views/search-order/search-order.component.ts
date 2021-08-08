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
  open=false
  isopen(){
    this.open=!(this.open)
  }
  Code:string=""
  ClientNumber:string=""
  orders:any[]=[]
  notFound=false
  formVisble=true
  getOrder() {
    console.log( this.ClientNumber)
    this.homeService.TrackOrder(this.Code, this.ClientNumber).subscribe(res => {
      this.formVisble=false
      this.orders = res
      // if(!this.ClientNumber&&this.orders.length>1)
      // this.orders=[]
      // else this.orders=res
      if(this.orders.length==0)
      this.notFound=true
      else
      this.notFound=false
      console.log(res)
    },
    err=>{
      this.formVisble=true
      this.notFound=false
    })
  }
  more(){
    this.formVisble=true
    this.notFound=false
    this.orders=[]
    this.Code=""
    this.ClientNumber=""
  }
  home() {
    this.router.navigate(['/home'])
  }
}
