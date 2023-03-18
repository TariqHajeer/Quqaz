import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() type: 'string' | 'text' | 'number' | 'date' | 'phone';
  @Input() minlengthInput?: number;
  @Input() maxlengthInput: number;
  @Input() className?: string;
  @Input() value?: any;
  @Output() valueChange?= new EventEmitter<any>();
  @Input() name: string;
  @Input() lable: string;
  @Input() disabled?: boolean;
  @Input() change?: any;
  @Input() required: boolean;
  errorMessage: string;
  changeValue(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
  checkLengthPhoneNumber() {
    if (this.value && this.value.length < 11) {
      this.errorMessage = 'لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم';
      return true;
    } else {
      this.errorMessage = '';
      return false;
    }
  }
}
