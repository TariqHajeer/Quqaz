import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-receipt-agent',
  templateUrl: './receipt-agent.component.html',
  styleUrls: ['./receipt-agent.component.scss'],
})
export class ReceiptAgentComponent implements OnInit, OnChanges {
  constructor(
    public sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}
  heads = [
    'ترقيم',
    'كود',
    'الإجمالي',
    'المحافظة ',
    'الهاتف',
    'اسم العميل',
    'ملاحظات',
  ];
  @Input() orders: any[] = [];
  count = 0;
  @Input() agent;
  @Input() orderplaced;
  @Input() printnumber;
  @Input() phones;
  @Input() showPrintbtn;
  dateOfPrint = moment().format();
  userName: any = this.authService.getUser();

  ngOnInit(): void {}

  ngOnChanges() {
    this.sumCost();
  }
  sumCost() {
    this.count = 0;
    if (this.orders)
      this.orders.forEach((o) => {
        this.count += o.cost;
      });
    return this.count;
  }
}
