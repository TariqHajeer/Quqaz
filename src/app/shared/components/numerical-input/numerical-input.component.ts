import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-numerical-input',
  templateUrl: './numerical-input.component.html',
  styleUrls: ['./numerical-input.component.scss']
})
export class NumericalInputComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    if (!this.value) {
      this.value = '0';
    }
  }
  @Input() value: string;
  @Input() disabled: boolean;
  @Input() required: boolean;
  @Input() minlengthInput?: number;
  @Input() maxlengthInput?: number;
  @Input() className?: string;
  @Input() placeholder?: string;
  @Input() lable?: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnter: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 45) {
      return false;
    }
    //this for - 
    if (charCode === 45) {
      if (this.value == '0')
        return false;
      this.value = (Number(this.value) * -1).toString();
      return false;
    }
    return true;
  }
  backspaceHandling(event): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (this.value == '-') {
      this.value = '0';
    }
    this.value = Number(this.value).toString();
  }
  keydownHandling(event): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (this.value.length <= 1 && charCode == 8) {
      this.value = '0';
    }
  }
  changeValue(event) {
    this.value = event;
    this.valueChange.emit(this.value);
  }
}
