import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-input',
  templateUrl: './point-input.component.html',
  styleUrls: ['./point-input.component.scss']
})
export class PointInputComponent implements OnInit {
  type = 'number';
  @Input() lable?: string = "النقاط";
  @Input() name:string='Points';
  @Input() maxlength?: number = 3;
  @Input() value;
  @Input() disabled?: boolean;
  @Input() change?: any;
  @Input() required: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
