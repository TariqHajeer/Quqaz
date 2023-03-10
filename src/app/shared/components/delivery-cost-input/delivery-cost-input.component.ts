import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-cost-input',
  templateUrl: './delivery-cost-input.component.html',
  styleUrls: ['./delivery-cost-input.component.scss']
})
export class DeliveryCostInputComponent implements OnInit {

  constructor() { }
  type = 'number';
  @Input() lable?: string = "كلفة التوصيل ";
  @Input() name?: string = 'DeliveryCost';
  maxlength: number = 6;
  @Input() value;
  @Input() disabled?: boolean;
  @Input() change?: any;
  @Input() required: boolean;
  ngOnInit(): void {
  }

}
