import { Component, OnInit } from '@angular/core';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';

@Component({
  selector: 'app-create-multiple',
  templateUrl: './create-multiple.component.html',
  styleUrls: ['./create-multiple.component.scss']
})
export class CreateMultipleComponent implements OnInit {
  orders:CreateMultipleOrder[];
  constructor() { }
  ngOnInit(): void {
  }
  

}
