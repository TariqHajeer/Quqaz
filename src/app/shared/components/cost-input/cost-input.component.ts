import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cost-input',
  templateUrl: './cost-input.component.html',
  styleUrls: ['./cost-input.component.scss']
})
export class CostInputComponent {
  @Input() lable?: string = "الكلفة الكلية";
  @Input() name?: string = 'Cost';
  @Input() placeholder?: string;
  maxlength: number;
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
