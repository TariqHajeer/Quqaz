import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() type: 'string' | 'text' | 'number' | 'date';
  @Input() minlengthInput?: number;
  @Input() maxlengthInput: number;
  @Input() className?: string;
  @Input() value?: any;
  @Input() name: string;
  @Input() lable: string;
  @Input() disabled?: boolean;
  @Input() change?: any;
  @Input() required: boolean;

}
