import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-cost-input',
  templateUrl: './delivery-cost-input.component.html',
  styleUrls: ['./delivery-cost-input.component.scss']
})
export class DeliveryCostInputComponent {

  constructor() { }
  type = 'number';
  @Input() lable?: string = "كلفة التوصيل ";
  @Input() name?: string = 'DeliveryCost';
  maxlength: number = 6;
  @Input() value;
  @Output() valueChange?= new EventEmitter<any>();
  @Input() disabled?: boolean;
  @Input() change?: any;
  @Input() required: boolean;
  @Input() className?: string;
  changeValue(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
}
