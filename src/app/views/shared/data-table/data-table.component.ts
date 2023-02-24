import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() title: string;
  @Input() headers: string[] = [];
  @Input() hasSelectAllCol:boolean;
  @Input() columns:any[];
  constructor() { }

  ngOnInit(): void {
  }

}
