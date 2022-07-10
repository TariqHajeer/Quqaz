import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostListener,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { HomeService } from "src/app/client-pages/service/home.service";
import { Store } from "src/app/Models/store/store.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2,
     private elRef: ElementRef,private scrollToService: ScrollToService,
     private router:Router,private homeservice:HomeService) {}

  showMobileMenu = false;


  titleAR=environment.appNameAR
  titleEN=environment.appNameEN
  phone=environment.companyPhones[1]
  whatsapp=environment.whatsapp
  address=environment.Address
  facebook=environment.Facebook
  instgram=environment.instgram
  email=environment.email
  
  adminRoot = 'home';

  slideSettings = {
    type: "carousel",
    gap: 30,
    perView: 4,
    hideNav: true,
    peek: { before: 10, after: 10 },
    breakpoints: {
      "600": { perView: 1 },
      "992": { perView: 2 },
      "1200": { perView: 3 },
    },
  };

  // slideItems = [
  //   {
  //     icon: "iconsminds-three-arrow-fork",
  //     title: "Right Click Menu",
  //     detail:
  //       "Increases overall usability of the project by providing additional actions menu.",
  //   },
  //   {
  //     icon: "iconsminds-electric-guitar",
  //     title: "Video Player",
  //     detail:
  //       "Carefully themed multimedia players powered by Video.js library with Youtube support.",
  //   },
  //   {
  //     icon: "iconsminds-keyboard",
  //     title: "Keyboard Shortcuts",
  //     detail:
  //       "Easily configurable keyboard shortcuts plugin that highly improves user experience.",
  //   },
  //   {
  //     icon: "iconsminds-three-arrow-fork ",
  //     title: "Two Panels Menu",
  //     detail:
  //       "Three states two panels icon menu that looks good, auto resizes and does the job well.",
  //   },
  //   {
  //     icon: "iconsminds-deer",
  //     title: "Icons Mind",
  //     detail:
  //       "1040 icons in 53 different categories, designed pixel perfect and ready for your project.",
  //   },
  //   {
  //     icon: "iconsminds-palette",
  //     title: "20 Color Schemes",
  //     detail:
  //       "Colors, icons and design harmony that creates excellent themes to cover entire project.",
  //   },
  //   {
  //     icon: "iconsminds-air-balloon-1",
  //     title: "3 Applications",
  //     detail:
  //       "Applications that mostly made of components are the way to get started to create something similar.",
  //   },
  //   {
  //     icon: "iconsminds-resize",
  //     title: "Extra Responsive",
  //     detail:
  //       "Custom Bootstrap 4 xxs & xxl classes delivers better experiences for smaller and larger screens.",
  //   },
  // ];

 





  ngOnInit() {
    this.renderer.addClass(document.body, "no-footer");
    this.getCountry()
    this.getMarket()
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
  countries:any[]=[]
  slideItem:any
  getCountry() {
    this.homeservice.getCountry().subscribe(res => {
      this.countries = res
      // this.slideItems = []
      // for (let i = 0; i < this.countries.length; i++) {
      //   this.slideItem.icon = "iconsminds-three-arrow-fork"
      //   this.slideItem.title = this.countries[i].name
      //   this.slideItem.detail = this.countries[i].name
      //   this.slideItems.push(this.slideItem)

      // }
      this.countries=this.chunk(this.countries,4)
    })
   

  }
  chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }
  clientURL = environment.clientApp
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('kokazUser')
    this.router.navigate(['/home'])
  }
  Markets:Store[]=[]
  baseUrl=environment.baseUrl
  getMarket(){
    this.homeservice.Market().subscribe(res => {
      this.Markets = res
      this.Markets=this.chunk(this.Markets,3)
    })
  }
  goToOrder(){
    this.router.navigate(['/searchOrder'])
  }
  clientHome(){
    this.router.navigate(['/clientHome'])
  }
}
