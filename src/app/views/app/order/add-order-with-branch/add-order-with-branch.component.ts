import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import orderPlaceds from 'src/app/data/orderPlaced';
import moenyplaceds from 'src/app/data/moneyPalced';
import { City } from 'src/app/Models/Cities/city.Model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import IIndex from 'src/app/shared/interfaces/IIndex';
import { Client } from '../../client/client.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { CountryService } from 'src/app/services/country.service'
import { IndexesService } from 'src/app/services/indexes.service';
import { ClientService } from '../../client/client.service';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';

@Component({
  selector: 'app-add-order-with-branch',
  templateUrl: './add-order-with-branch.component.html',
  styleUrls: ['./add-order-with-branch.component.scss']
})
export class AddOrderWithBranchComponent implements OnInit {
  Order: CreateOrdersFromEmployee;
  submitted: boolean = false;
  orderPlace: IIndex[] = [];
  MoenyPlaced: IIndex[] = [];
  clients: Client[] = [];
  countries: City[] = [];
  Region: Region[] = [];
  Regions: Region[] = [];
  Agents: User[] = [];
  GetAgents: User[] = [];
  orderTypes: OrderType[] = [];
  orderType: OrderType;
  OrderItem: OrderItem;
  count;
  filter: OrderFilter;
  tempPhone: string;
  cityapi: string = 'Country';
  regionapi: string = 'Region';
  ordertypeapi: string = 'OrderType';
  EditorderType: OrderType;
  EditOrderItem: OrderItem;
  Editcount: number;
  userLogin: UserLogin = this.authService.getUser();
  disabledAgent: boolean = false;
  branches: NameAndIdDto[] = [];
  constructor(
    private orderservice: OrderService,
    private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
    private authService: AuthService,
    private indexesService: IndexesService,
    private countryService: CountryService,
    private clientService: ClientService
  ) { }


  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee();
    this.orderType = new OrderType();
    this.OrderItem = new OrderItem();
    this.EditorderType = new OrderType();
    this.EditOrderItem = new OrderItem();
    this.submitted = false;
    this.int();
  }
  int() {
    this.Order = new CreateOrdersFromEmployee();
    this.submitted = false;
    this.GetMoenyPlaced();
    this.GetorderPlace();
    this.getIndexes();
  }
  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Branches]).subscribe(response => {
      this.branches = response.benaches;
    })
  }

  GetorderPlace() {
    this.orderPlace = [...orderPlaceds];
    this.Order.OrderplacedId = this.orderPlace[1].id;
  }
  GetMoenyPlaced() {
    this.MoenyPlaced = [...moenyplaceds];
    this.Order.MoenyPlacedId = this.MoenyPlaced[0].id;
  }


  AllorderTypes: any[] = [];
  getOrderTypes() {
    this.customerService.getAll(this.ordertypeapi).subscribe((res) => {
      this.orderTypes = res;
      this.AllorderTypes = res;
    });
  }
  submitordertype: boolean = false;
  AddOrderType() {
    if (!this.orderType || !this.count) {
      this.submitordertype = true;
      return;
    } else this.submitordertype = false;
    if (
      this.orderTypes.filter((o) => o.name == this.orderType.name).length < 1
    ) {
      this.customerService
        .Create(this.ordertypeapi, this.orderType)
        .subscribe((res) => { });
    }
    this.OrderItem.OrderTypeId = this.orderType.id;
    this.OrderItem.OrderTypeName = this.orderType.name;
    this.OrderItem.Count = this.count;
    this.Order.OrderTypeDtos.push(this.OrderItem);
    this.orderTypes = this.orderTypes.filter((o) => o != this.orderType);
    this.OrderItem = new OrderItem();
    this.orderType = new OrderType();
    this.count = null;
  }
  changeCountry() {
    this.Region = [];
    this.Order.RegionId = null;
    this.Order.AgentId = null;
    var city = this.countries.find((c) => c.id == this.Order.CountryId);
    if (city.requiredAgent) {
      this.disabledAgent = false;
      this.Agents = city.agents;
      if (this.Agents.length != 0) this.Order.AgentId = this.Agents[0].id;
    }
    else {
      this.disabledAgent = true;
      this.Order.AgentId = null;
    }
    this.Order.DeliveryCost = city.deliveryCost;
    this.Region = city.regions;
    if (this.Region.length != 0) this.Order.RegionId = this.Region[0].id;
  }
  showMessageCode: boolean = false;
  CheckCode() {
    if (this.Order.ClientId != null && this.Order.ClientId != undefined) {
      this.orderservice
        .chekcCode(this.Order.Code, this.Order.ClientId)
        .subscribe((res) => {
          if (res) {
            this.showMessageCode = true;
          } else this.showMessageCode = false;
        });
    }
  }
  //input inside ng for
  onTrackBy(index) {
    return index;
  }
  addNewPhone() {
    if (this.checkLengthPhoneNumber(this.tempPhone)) return;
    this.Order.RecipientPhones.push(this.tempPhone);
    this.tempPhone = '';
  }
  deletePhone(phone) {
    this.Order.RecipientPhones = this.Order.RecipientPhones.filter(
      (p) => p != phone
    );
  }
  RecipientPhoneslength = null;
  checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength =
        ' لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم';
      return true;
    } else {
      this.RecipientPhoneslength = null;
      return false;
    }
  }
  RecipientPhoneslengthEdit = null;
  checkLengthPhoneNumberForEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit =
        ' لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم';
      return true;
    } else {
      this.RecipientPhoneslengthEdit = null;
      return false;
    }
  }
  tempEditOrderType;
  EditOrderType(OrderType: OrderItem) {
    OrderType.CanEdit = true;
    this.EditorderType = this.AllorderTypes.find(
      (o) => o.id == OrderType.OrderTypeId
    );
    this.Editcount = OrderType.Count;
    this.tempEditOrderType = Object.assign({}, OrderType);
  }
  SaveOrderType(OrderType) {
    this.EditOrderItem.CanEdit = false;
    this.EditOrderItem.Count = this.Editcount;
    this.EditOrderItem.OrderTypeName = this.EditorderType.name;
    this.EditOrderItem.OrderTypeId = this.EditorderType.id;
    OrderType = Object.assign(OrderType, this.EditOrderItem);
  }

  deleteOrderType(OrderType) {
    this.Order.OrderTypeDtos = this.Order.OrderTypeDtos.filter(
      (o) => o != OrderType
    );
  }
  CansleEditOrderType(OrderType) {
    this.tempEditOrderType.CanEdit = false;
    OrderType = Object.assign(OrderType, this.tempEditOrderType);
  }
  index = 0;
  changeIndex(number) {
    this.index = number;
  }
  changeBranch() {
    this.clientService.getClientByBranchId(this.Order.branchId).subscribe(res => {
      this.clients = res;
    });
    this.countryService.getCountriesFromBrachToCurrentBranch(this.Order.branchId).subscribe(res => {
      this.countries = res;
    })
  }
  AddOrder() {
    if (this.tempPhone != '' && this.tempPhone != undefined) {
      this.Order.RecipientPhones.push(this.tempPhone);
      this.tempPhone = '';
    }
    if (
      this.showMessageCode ||
      this.Order.RecipientPhones.length == 0 ||
      !this.Order.Cost ||
      !this.Order.Code ||
      !this.Order.ClientId ||
      (!(!this.disabledAgent == !!this.Order.AgentId)) ||
      !this.Order.CountryId ||
      !this.Order.OrderplacedId ||
      !this.Order.MoenyPlacedId ||
      this.RecipientPhoneslengthEdit != null ||
      this.RecipientPhoneslength != null ||
      this.Order.branchId
    ) {
      this.submitted = true;
      return;
    } else this.submitted = false;

    if (isNaN(this.Order.RegionId)) {
      this.Order.RegionName = this.Order.RegionId.label;
      this.Order.RegionId = null;
    }
    this.spinner.show();
    this.Order.DeliveryCost = Number(this.Order.DeliveryCost);
    this.Order.Cost = Number(this.Order.Cost);
    this.Order.Date = moment().format();
    this.orderservice.createOrderWithBranch(this.Order).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم اضافة طلب بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.int();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
