import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-receipt-set-print-number',
  templateUrl: './receipt-set-print-number.component.html',
  styleUrls: ['./receipt-set-print-number.component.scss'],
})
export class ReceiptSetPrintNumberComponent implements OnInit, OnChanges {
  constructor(
    public sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف', 'ملاحظات'];
  @Input() orders: any[] = [];
  count = 0;
  @Input() agent;
  @Input() orderplaced;
  @Input() printnumber;
  @Input() phones;
  dateOfPrint = new Date();
  userName: UserLogin = this.authService.getUser();

  ngOnInit(): void {}
  // @HostListener('window:afterprint')
  // onafterprint() {
  //   console.log("tr")
  // }
  ngOnChanges() {
    this.sumCost();
  }
  sumCost() {
    this.count = 0;
    if (this.orders)
      this.orders.forEach((o) => {
        this.count += o.total;
      });
    return this.count;
  }
}
