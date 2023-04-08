import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-cost-input',
  templateUrl: './delivery-cost-input.component.html',
  styleUrls: ['./delivery-cost-input.component.scss']
})
export class DeliveryCostInputComponent {

  constructor() { }
  @Input() lable?: string = "كلفة التوصيل ";
  @Input() name?: string = 'DeliveryCost';
  @Input() placeholder?: string;
  maxlength: number = 6;
  @Input() value;
  @Output() valueChange?= new EventEmitter<any>();
  @Input() disabled?: boolean;
  @Output() change?= new EventEmitter<any>();
  @Input() required: boolean;
  @Input() className?: string;
  @Output() onEnter?= new EventEmitter<any>();
  changeValue(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
}
