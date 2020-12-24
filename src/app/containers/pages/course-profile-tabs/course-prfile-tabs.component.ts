import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-course-profile-tabs',
  templateUrl: './course-prfile-tabs.component.html'
})
export class CourseProfileTabsComponent implements OnInit {

  constructor(private lightbox: Lightbox) { }
  overView="OverView And outComes"
  isReadOnly=true;
  members:any[]=[ {
    name: 'Mayra Sibley',
    status: 'Lack of Humility',
    thumb: '/assets/img/profiles/l-5.jpg',
    large: '/assets/img/profiles/5.jpg',
    id: 1
  },
  {
    name: 'Philip Nelms',
    status: 'Lead Developer',
    thumb: '/assets/img/profiles/l-2.jpg',
    large: '/assets/img/profiles/2.jpg',
    id: 2
  },
  {
    name: 'Kathryn Mengel',
    status: 'Dog & Cat Person',
    thumb: '/assets/img/profiles/l-10.jpg',
    large: '/assets/img/profiles/10.jpg',
    id: 3
  },]
  ngOnInit() {
  }
  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }
}
