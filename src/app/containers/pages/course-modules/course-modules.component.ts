import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-modules',
  templateUrl: './course-modules.component.html'
})
export class CourseModulesComponent implements OnInit {
  constructor() { }
  modules:any[]=[
    {name:'first module',sessions:[{name:'session1'},{name:'session2'}],duration:'8',locked:1,batch_id:1,until:'2020-05-02 08:00:00'},
    {name:'seconed module',sessions:[{name:'session1'},{name:'session2'}],duration:'12',locked:0,batch_id:1,until:'2020-05-02 08:00:00'},
    {name:'third module',sessions:[{name:'session2'},{name:'session2'}],duration:'9',locked:1,batch_id:1,until:'2020-05-02 08:00:00'},

  ];
  isCollapsed:any[] = [true,true,true,true];

  messageEvents: string;

  isOpen = true;

  isInlineCollapsed = false;

  collapsed(): void {
    this.messageEvents = 'collapsed';
  }

  collapses(): void {
    this.messageEvents = 'collapses';
  }
  ngOnInit() {
  }

}
