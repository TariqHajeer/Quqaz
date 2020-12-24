import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-course-profile-admin',
  templateUrl: './course-profile-admin.component.html'
})
export class CourseProfileAdminComponent implements OnInit {

  constructor(private lightbox: Lightbox) { }

  ngOnInit() {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }
}
