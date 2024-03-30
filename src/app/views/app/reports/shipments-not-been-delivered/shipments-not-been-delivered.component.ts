import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';
import { PointSettingsService } from 'src/app/services/point-settings.service';
import { AuthService } from 'src/app/shared/auth.service';
import { OrderClientDontDiliverdMoney } from 'src/app/Models/order/order-client-dont-diliverd-money.model';
import { DeleiverMoneyForClientDto } from 'src/app/Models/order/deleiver-money-for-client-dto.model';
@Component({
  selector: 'app-shipments-not-been-delivered',
  templateUrl: './shipments-not-been-delivered.component.html',
  styleUrls: ['./shipments-not-been-delivered.component.scss'],
})
export class ShipmentsNotBeenDeliveredComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'index',
    'code',
    'agent',
    'oldCost',
    'cost',
    'deliveryCost',
    'clientCost',
    'country',
    'region',
    'monePlaced',
    'orderplaced',
    'date',
    'agentPrintNumber',
    'clientPrintNumber',
    'note',
    'isClientDiliverdMoney',
  ];
  dataSource = new MatTableDataSource([]);
  clientId: number;
  orderPlace: any[] = [
    { id: 3, name: 'في الطريق', permission: 'PayInWay' },
    { id: 4, name: 'تم التسليم', permission: 'PayCompletelyReturned' },
    { id: 5, name: 'مرتجع كلي', permission: 'PayPartialReturned' },
    { id: 6, name: 'مرتجع جزئي', permission: 'PayDelivered' },
    { id: 7, name: 'مرفوض', permission: 'PayUnacceptable' },
  ];
  tempOrderplace: any[] = [];
  clients: Client[] = [];
  client: Client = new Client();
  paging: Paging = new Paging();
  filter: OrderFilter = new OrderFilter();
  noDataFound: boolean = false;
  isClientDeleviredMoney: boolean = false;
  clientDoNotDeleviredMoney: boolean = false;
  @Input() totalCount: number = 0;
  points: any[] = [];
  pointId: number = 0;
  /* select all prob*/
  selection = new SelectionModel<any>(true, []);
  selectAll: boolean = false;
  ordersIds = [];
  orders: any[] = [];
  unSelectIds = [];
  countSelectOrder: number = 0;
  indeterminate: boolean = false;
  headerChekclable: string = "deselect all";
  lastMasterSelectionChoise: boolean = false;
  constructor(
    private orderservice: OrderService,
    public clientService: ClientService,
    private notifications: NotificationsService,
    public route: Router,
    private pointSettingService: PointSettingsService,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.showOrderPlaceds();
    this.orderservice.orderClientDontDiliverdMoney = new OrderClientDontDiliverdMoney();
    this.orderservice.deleiverMoneyForClientDto=new DeleiverMoneyForClientDto();    
  }
  setIsAllSelected(isAllSelected: boolean): void {
    this.selectAll = isAllSelected;
    if (this.selectAll) {
      this.lastMasterSelectionChoise = true;
    }
    this.ref.detectChanges();
    this.setHeaderChekclable();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.ordersIds = [];
    this.orders = [];
    this.unSelectIds = [];
    if (!this.selectAll) {
      this.selection.clear();
      this.lastMasterSelectionChoise = false;
      this.setCountSelectOrder(0);
      return;
    }
    this.dataSource.data.forEach(row => {
      this.selection.select(row);
    });
    this.lastMasterSelectionChoise = true;
    this.setCountSelectOrder(this.totalCount);
  }
  setHeaderChekclable(): void {
    if (this.selectAll) {
      this.headerChekclable = "select all";
    } else {
      this.headerChekclable = "deselect all";
    }
    this.ref.detectChanges();
  }
  setCountSelectOrder(number: number): void {
    if (this.countSelectOrder !== number) {
      this.countSelectOrder = number;
      this.ref.detectChanges();
    }
  }
  /** The label for the checkbox on the passed row */
  rowCheckChange(row: any) {
    this.selection.toggle(row);
    this.checkboxId(row);
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      this.setCountSelectOrder(this.countSelectOrder + 1);
      if (this.lastMasterSelectionChoise) {
        this.unSelectIds = this.unSelectIds.filter(c => c != row.id);
      }
      else {
        this.ordersIds.push(row.id);
        this.orders.push(row);
      }
      if (this.countSelectOrder == this.totalCount) {
        this.setIsAllSelected(true);
      }
    }
    else {
      this.setIsAllSelected(false);
      if (this.lastMasterSelectionChoise) {
        this.unSelectIds.push(row.id);
        if (this.unSelectIds.length == this.totalCount) {
          this.lastMasterSelectionChoise = false;
        }
      } else {
        this.ordersIds = this.ordersIds.filter(c => c != row.id);
        this.orders = this.orders.filter(o => o.id != row.id);
      }
      this.setCountSelectOrder(this.countSelectOrder - 1);
    }
  }

  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }
  changeClientId() {
    this.clientId = this.client?.id;
    if (this.clientId) {
      this.getSettingLessThanPoint();
    } else this.points = [];
    this.getOrders();
  }
  getSettingLessThanPoint() {
    if (this.clientId) {
      var client = this.clients.find((c) => c.id == this.clientId);
      this.pointSettingService
        .GetSettingLessThanPoint(client.points)
        .subscribe((res) => {
          this.points = res;
        });
    } else {
      this.points = [];
    }
  }
  showOrderPlaceds() {
    this.orderPlace = this.orderPlace.filter(
      (op) => this.authService.hasPermission(op.permission) == true
    );
    return this.orderPlace;
  }
  filtering() {
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.orderservice.orderClientDontDiliverdMoney = new OrderClientDontDiliverdMoney();
    this.ordersIds = [];
    this.orders = [];
    this.unSelectIds = [];
    this.lastMasterSelectionChoise = false;
    this.setIsAllSelected(false);
    this.setCountSelectOrder(0);
    this.selection.clear();
    this.getOrders();
  }

  getOrders() {
    this.orderservice.orderClientDontDiliverdMoney.ClientId = this.clientId;
    this.orderservice.orderClientDontDiliverdMoney.Client = this.client;
    this.orderservice.orderClientDontDiliverdMoney.IsClientDeleviredMoney = this.isClientDeleviredMoney;
    this.orderservice.orderClientDontDiliverdMoney.ClientDoNotDeleviredMoney = this.clientDoNotDeleviredMoney;
    var orderPlace = this.orderPlace.filter((o) => o.checked == true);
    this.tempOrderplace = this.orderPlace.filter((o) => o.checked == true);
    this.orderservice.orderClientDontDiliverdMoney.OrderPlacedId = orderPlace.map((o) => o.id);
    this.orderservice.orderClientDontDiliverdMoney.OrderPlaced = orderPlace;
    if (
      this.clientId &&
      this.orderPlace.filter((o) => o.checked == true).length > 0 &&
      (this.isClientDeleviredMoney || this.clientDoNotDeleviredMoney)
    ) {
      this.orderservice.OrdersDontFinished().subscribe(
        (response) => {
            if (!response||!response.data||response.data.data.length == 0) this.noDataFound = true;
            else {
              this.noDataFound = false;
          var x = response.data.data.sort((a, b) => a.code - b.code * 1);
          this.orderFilter = response.data.data;
          this.dataSource = new MatTableDataSource(x);
          this.totalCount = response.data.total;
          if (this.selectAll) {
            this.dataSource.data.forEach(row => this.selection.select(row));
          }
          else
            if (this.lastMasterSelectionChoise) {

              this.dataSource.data.filter(row => this.unSelectIds.indexOf(row.id) == -1)
                .forEach(row => this.selection.select(row));
            }
            else {
              this.dataSource.data.filter(row => this.ordersIds.indexOf(row.id) >= 0)
                .forEach(row => this.selection.select(row));
            }
            }
        },
        (err) => { }
      );
    } else this.dataSource = new MatTableDataSource([]);
  }
  switchPage(event: PageEvent) {
    this.orderservice.orderClientDontDiliverdMoney.paging.allItemsLength = event.length;
    this.orderservice.orderClientDontDiliverdMoney.paging.RowCount = event.pageSize;
    this.orderservice.orderClientDontDiliverdMoney.paging.Page = event.pageIndex + 1;
    this.getOrders();
  }

  print() {
    this.orderservice.orderClientDontDiliverdMoney.tableSelection.exceptIds = this.unSelectIds;
    this.orderservice.orderClientDontDiliverdMoney.tableSelection.selectedIds = this.ordersIds;
    this.orderservice.orderClientDontDiliverdMoney.tableSelection.isSelectedAll = this.lastMasterSelectionChoise;
    if (this.pointId == 0)
      this.orderservice.deleiverMoneyForClientDto.PointsSettingId = null;
    else
      this.orderservice.deleiverMoneyForClientDto.PointsSettingId = this.pointId;
    this.orderservice.deleiverMoneyForClientDto.point = this.points.find(p => p.id == this.pointId);
    if (this.noDataFound == true || (this.orderservice.orderClientDontDiliverdMoney.tableSelection.selectedIds.length == 0 && !this.orderservice.orderClientDontDiliverdMoney.tableSelection.isSelectedAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return;
    } else
      this.route.navigate(['app/reports/PrintOrdersDontFinished']);
  }

  changeDeleiverMoneyForClient() {
    this.orderservice
      .DeleiverMoneyForClient(this.orders.map((o) => o.id))
      .subscribe((res) => {
        this.notifications.create(
          'success',
          'تم تعديل الطلبيات  بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.filtering();
      });
  }
  code;
  orderFilter;
  codeFillter() {
    this.dataSource.data = this.orderFilter;
    if (this.code)
      if (this.dataSource.data.length != 0)
        this.dataSource.data = this.dataSource.data.filter((d) =>
          d.code.includes(this.code)
        );
  }
}
