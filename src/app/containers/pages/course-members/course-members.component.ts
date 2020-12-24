import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-members',
  templateUrl: './course-members.component.html'
})
export class CourseMembersComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
