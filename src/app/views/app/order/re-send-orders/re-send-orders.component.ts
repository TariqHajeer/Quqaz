import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { Resend } from 'src/app/Models/order/resend.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-re-send-orders',
  templateUrl: './re-send-orders.component.html',
  styleUrls: ['./re-send-orders.component.scss'],
})
export class ReSendOrdersComponent implements OnInit {
  constructor(
    private customerService: CustomService,
    private userService: UserService,
    private orderService: OrderService,
    private notifications: NotificationsService
  ) {}
  orderResend: Resend = new Resend();
  ordersResend: Resend[] = [];
  cities: City[] = [];
  Region: Region[] = [];
  Agents: User[] = [];
  cityapi = 'Country';
  regionapi = 'Region';
  code: any;
  showTable: boolean = false;
  Ordersfilter: any[] = [];
  ngOnInit(): void {
    this.getAgent();
    this.GetRegion();
    this.Getcities();
  }

  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe((res) => {
      this.Region = res;
    });
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe((res) => {
      this.cities = res;
    });
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe((res) => {
      this.Agents = res;
    });
  }
  getResendOrderByCode() {
    this.orderService.GetReSendMultiple(this.code).subscribe((res) => {
      if (res.length < 1) {
        this.notifications.error(
          'error',
          'يجب التأكد من كود الشحنة',
          NotificationType.Error,
          { theClass: 'error', timeOut: 6000, showProgressBar: false }
        );
        return;
      }

      if (res.length > 1) {
        this.showTable = true;
        this.Ordersfilter = res;
      } else if (res.length == 1) {
        this.showTable = false;
        this.add(res[0]);
        this.code = '';
      }
    },err=>{
      this.notifications.error(
        'error',
        'حدث خطأ ما يرحى المحاولة لاحقا',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
    });
  }
  add(order) {
    this.orderResend.code = order.code;
    this.orderResend.client = order.client;
    this.orderResend.AgnetId = order.agent?.id;
    this.orderResend.CountryId = order.country?.id;
    this.orderResend.RegionId = order.region ? order.region.id : null;
    this.orderResend.DeliveryCost = order.deliveryCost;
    this.orderResend.Id = order.id;
    this.orderResend.Countries = [...this.cities];
    this.orderResend.Agents = [
      ...this.Agents.filter(
        (a) =>
          a.countries
            .map((c) => c.id)
            .filter((co) => co == this.orderResend.CountryId).length > 0
      ),
    ];
    this.orderResend.Regions = [
      ...this.Region.filter((r) => r.country.id == this.orderResend.CountryId),
    ];
    if (
      this.ordersResend.filter((item) => item.Id == this.orderResend.Id)
        .length > 0
    ) {
      this.notifications.error(
        'error',
        'الطلب مضاف مسبقا',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
      this.cancel(order);
      return;
    }
    this.ordersResend.push(this.orderResend);
    this.cancel(order);
    this.orderResend = new Resend();
  }
  cancel(order) {
    this.Ordersfilter = this.Ordersfilter.filter((item) => item != order);
    if (this.Ordersfilter.length == 0) {
      this.showTable = false;
      this.code = null;
    }
  }
  changeCountryResend(order) {
    var city = this.cities.find((c) => c.id == order.CountryId);
    order.DeliveryCost = city.deliveryCost;
    order.RegionId = null;
    order.Regions = [
      ...this.Region.filter((r) => r.country.id == order.CountryId),
    ];
    order.Agents = [
      ...this.Agents.filter(
        (a) =>
          a.countries.map((c) => c.id).filter((co) => co == order.CountryId)
            .length > 0
      ),
    ];
    if (order.Agents.length == 1) order.AgnetId = order.Agents[0].id;
    else order.AgnetId = null;
    if (order.Regions.length == 1) order.RegionId = order.Regions[0].id;
    else order.RegionId = null;
  }
  save() {

    this.ordersResend.forEach((item) => {
      item.DeliveryCost = Number(item.DeliveryCost);
    });
    if(this.ordersResend.filter(item=>!item.AgnetId||!item.CountryId||!item.DeliveryCost).length>0)
    {
      this.notifications.error(
        'error',
        'يجب التأكد من ملئ جميع الحقول االمطلوبة',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
      return;
    }
    if (this.ordersResend.length > 0) {
      this.orderService
        .PutReSendMultiple(this.ordersResend)
        .subscribe((res) => {
          this.notifications.success(
            'success',
            'تمت اعادة ارسال الطلبات بنجاح',
            NotificationType.Success,
            { theClass: 'success', timeOut: 6000, showProgressBar: false }
          );
          this.ordersResend = [];
          this.code = null;
        },err=>{
          this.notifications.error(
            'error',
            'حدث خطأ ما يرحى المحاولة لاحقا',
            NotificationType.Error,
            { theClass: 'error', timeOut: 6000, showProgressBar: false }
          );
        });
    }
  }
  cancelOrder(order) {
    this.ordersResend = this.ordersResend.filter((item) => item != order);
  }
}
