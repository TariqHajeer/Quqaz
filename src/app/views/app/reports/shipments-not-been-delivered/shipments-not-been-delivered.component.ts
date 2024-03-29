import { Component, Input, OnInit } from '@angular/core';
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
import { OrderClientDontDiliverdMoney } from 'src/app/Models/order/order-client-dont-diliverd-money.model';
import { PointSettingsService } from 'src/app/services/point-settings.service';
import { AuthService } from 'src/app/shared/auth.service';

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
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => {
          this.selection.select(row);
        });
    this.orders = [];
    this.ids = [];
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  ids: any[] = [];
  orders: any[] = [];
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.ids.filter((d) => d == row.id).length > 0) return;
      else {
        this.ids.push(row.id);
        this.orders.push(row);
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter((i) => i != row.id);
      this.orders = this.orders.filter((o) => o != row);
    }
  }
  constructor(
    private orderservice: OrderService,
    public clientService: ClientService,
    private notifications: NotificationsService,
    public route: Router,
    private pointSettingService: PointSettingsService,
    private authService:AuthService
  ) {}
  ClientId;
  OrderplacedId;
  orderPlace: any[] = [
    { id: 3, name: 'في الطريق', permission: 'PayInWay' },
    { id: 4, name: 'تم التسليم', permission: 'PayCompletelyReturned' },
    { id: 5, name: 'مرتجع كلي', permission: 'PayPartialReturned' },
    { id: 6, name: 'مرتجع جزئي', permission: 'PayDelivered' },
    { id: 7, name: 'مرفوض', permission: 'PayUnacceptable' },
  ];
  Clients: Client[] = [];
  paging: Paging;
  filtering: OrderFilter;
  noDataFound: boolean = false;
  IsClientDeleviredMoney: boolean = false;
  ClientDoNotDeleviredMoney: boolean = false;
  @Input() totalCount: number;

  ngOnInit(): void {
    localStorage.removeItem('reloadPage');
    localStorage.removeItem('printordersclient');
    localStorage.removeItem('printclient');
    localStorage.removeItem('printclientorderplaced');
    this.getClients();
    this.paging = new Paging();
    this.filtering = new OrderFilter();
    this.order = new OrderClientDontDiliverdMoney();
    this.showOrderPlaceds();
  }

  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.Clients = res;
    });
  }
  ChangeClientId() {
    if (this.ClientId) {
      this.GetSettingLessThanPoint();
    } else this.points = [];
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.allFilter();
  }
  order: OrderClientDontDiliverdMoney;
  orderplace;
  allFilter() {
    this.order.ClientId = this.ClientId;
    this.order.IsClientDeleviredMoney = this.IsClientDeleviredMoney;
    this.order.ClientDoNotDeleviredMoney = this.ClientDoNotDeleviredMoney;
    var orderPlace = this.orderPlace.filter((o) => o.checked == true);
    this.orderplace = this.orderPlace.filter((o) => o.checked == true);
    this.order.OrderPlacedId = orderPlace.map((o) => o.id);
    if (
      this.ClientId &&
      this.orderPlace.filter((o) => o.checked == true).length > 0 &&
      (this.IsClientDeleviredMoney || this.ClientDoNotDeleviredMoney)
    ) {
      this.orderservice.ClientDontDiliverdMoney(this.order).subscribe(
        (response) => {
          if (response)
            if (response.length == 0) this.noDataFound = true;
            else this.noDataFound = false;
          var x = response.sort((a, b) => a.code - b.code * 1);
          this.orderFilter = response;
          this.dataSource = new MatTableDataSource(x);
          this.totalCount = response.length;
        },
        (err) => {}
      );
    } else this.dataSource = new MatTableDataSource([]);
  }
  print() {
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create(
        'error',
        '   لم يتم اختيار طلبات ',
        NotificationType.Error,
        { theClass: 'success', timeOut: 6000, showProgressBar: false }
      );
      return;
    }
    this.orderplace = this.orderplace.filter(
      (op) => this.orders.filter((o) => o.orderplaced.id == op.id).length > 0
    );
    localStorage.setItem(
      'printclientorderplaced',
      JSON.stringify(this.orderplace)
    );
    localStorage.setItem('printordersclient', JSON.stringify(this.orders));
    localStorage.setItem(
      'printclient',
      JSON.stringify(this.Clients.find((c) => c.id == this.ClientId))
    );
    if (this.PointId == 0) {
      localStorage.setItem('point', JSON.stringify(null));
    } else
      localStorage.setItem(
        'point',
        JSON.stringify(this.points.find((p) => p.id == this.PointId))
      );
    this.route.navigate(['app/reports/printclientpreview']);
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
        this.allFilter();
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
  points: any[] = [];
  PointId = 0;
  GetSettingLessThanPoint() {
    if (this.ClientId) {
      var client = this.Clients.find((c) => c.id == this.ClientId);
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
    return  this.orderPlace;
  }
}
