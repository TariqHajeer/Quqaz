import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-receipt-order-in-company',
  templateUrl: './receipt-order-in-company.component.html',
  styleUrls: ['./receipt-order-in-company.component.scss'],
})
export class ReceiptOrderInCompanyComponent implements OnInit {
  constructor(
    public sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}
  //'موقع المبلغ', 'حالة الشحنة '
  heads = [
    'ترقيم',
    'رقم الوصل',
    'الإجمالي',
    'الرسوم',
    ' يدفع للعميل',
    'المحافظة ',
    'الهاتف',
    'ملاحظات',
  ];
  @Input() orders: any[] = [];
  count = 0;
  @Input() client;
  @Input() printnumber;
  dateOfPrint = new Date();
  address = 'أربيل - شارع 40 - قرب تقاطع كوك';
  companyPhone = '07514550880 - 07700890880';
  userName: UserLogin = this.authService.getUser();

  ngOnInit(): void {}
  ngOnChanges() {
    this.sumCost();
  }
  deliveryCostCount;
  sumCost() {
    this.count = 0;
    this.deliveryCostCount = 0;
    if (this.orders)
      this.orders.forEach((o) => {
        this.count += o.order.cost;
        this.deliveryCostCount += o.order.deliveryCost;
      });
    return this.count;
  }
  RowClass(order) {
    switch (order.orderplaced.id) {
      case OrderplacedEnum.Delivered:
        return 'Delivery';
      case OrderplacedEnum.CompletelyReturned:
        return 'Holisticrebound';
      case OrderplacedEnum.PartialReturned:
        return 'Partialrefund';
      case OrderplacedEnum.Delayed:
        return 'delay';
      case OrderplacedEnum.Unacceptable:
        return 'unacceptable';
      default:
        return 'default';
    }
  }
}
