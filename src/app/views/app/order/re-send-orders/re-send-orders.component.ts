import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import { Resend } from 'src/app/Models/order/resend.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { IndexesService } from 'src/app/services/indexes.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-re-send-orders',
  templateUrl: './re-send-orders.component.html',
  styleUrls: ['./re-send-orders.component.scss'],
})
export class ReSendOrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private notifications: NotificationsService,
    private indexesService: IndexesService,
    private authService: AuthService,

  ) { }
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
  currentUser: UserLogin = new UserLogin();

  ngOnInit(): void {
    this.getIndexes();
    this.currentUser = this.authService.getUser();
  }
  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries]).subscribe(response => {
      this.cities = response.countries;
    })
  }
  getResendOrderByCode() {
    this.orderService.GetReSendMultiple(this.code).subscribe((res) => {
      if (res.length < 1) {
        this.notifications.error(
          'error',
          'يجب التأكد من كود الشحنة',
          NotificationType.Error,
          { theClass: 'error', timeOut: 2000, showProgressBar: false }
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
    }, err => {
      this.notifications.error(
        'error',
        'حدث خطأ ما يرحى المحاولة لاحقا',
        NotificationType.Error,
        { theClass: 'error', timeOut: 2000, showProgressBar: false }
      );
    });
  }
  add(order) {
    this.orderResend.code = order.code;
    this.orderResend.client = order.client;
    this.orderResend.CountryId = order.country?.id;
    this.orderResend.RegionId = order.region ? order.region.id : null;
    let country = this.cities.find(c => c.id == this.orderResend.CountryId);
    if (country.requiredAgent) {
      this.orderResend.Agents = country.agents
      this.orderResend.AgnetId = order.agent?.id;
      this.orderResend.disabledAgent = false;
    }
    else {
      this.orderResend.disabledAgent = true;
    }
    this.orderResend.DeliveryCost = order.oldDeliveryCost;
    this.orderResend.Id = order.id;
    this.orderResend.Countries = [...this.cities];
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
        { theClass: 'error', timeOut: 2000, showProgressBar: false }
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
    order.Regions = city.regions;
    order.Agents = city.agents;
    if (city.requiredAgent) {
      order.disabledAgent = false;
      if (order.Agents.length == 1) order.AgnetId = order.Agents[0].id;
      else order.AgnetId = null;
    }
    else {
      order.disabledAgent = true;
      order.AgnetId = null;
    }

    if (order.Regions.length == 1) order.RegionId = order.Regions[0].id;
    else order.RegionId = null;
  }
  save() {
    this.ordersResend.forEach((item) => {
      item.DeliveryCost = Number(item.DeliveryCost);
    });
    if (this.ordersResend.filter(item => !item.AgnetId || !item.CountryId || !item.DeliveryCost).length > 0) {
      this.notifications.error(
        'error',
        'يجب التأكد من ملئ جميع الحقول االمطلوبة',
        NotificationType.Error,
        { theClass: 'error', timeOut: 2000, showProgressBar: false }
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
            { theClass: 'success', timeOut: 2000, showProgressBar: false }
          );
          this.ordersResend = [];
          this.code = null;
        }, err => {
          this.notifications.error(
            'error',
            'حدث خطأ ما يرحى المحاولة لاحقا',
            NotificationType.Error,
            { theClass: 'error', timeOut: 2000, showProgressBar: false }
          );
        });
    }
  }
  cancelOrder(order) {
    this.ordersResend = this.ordersResend.filter((item) => item != order);
  }
}
