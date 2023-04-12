import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-point-input',
  templateUrl: './point-input.component.html',
  styleUrls: ['./point-input.component.scss']
})
export class PointInputComponent{
  @Input() lable?: string = "النقاط";
  @Input() name:string='Points';
  @Input() maxlength?: number = 3;
  @Input() value;
  @Output() valueChange?= new EventEmitter<any>();
  @Input() disabled?: boolean;
  @Output() change?= new EventEmitter<any>();
  @Input() required: boolean;
  changeValue(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
}
