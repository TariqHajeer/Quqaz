import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';
import { CustomService } from 'src/app/services/custom.service';
import { City } from 'src/app/Models/Cities/city.Model';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-get-orders-forzen-in-way',
  templateUrl: './get-orders-forzen-in-way.component.html',
  styleUrls: ['./get-orders-forzen-in-way.component.scss']
})
export class GetOrdersForzenInWayComponent implements OnInit {
  hour: number;
  agentId: number;
  countryId: number;
  clientId: number;
  currentDate: Date;
  isInStock: boolean;
  isInWay: boolean;
  isWithAgent: boolean;
  agents: User[] = [];
  clients: Client[] = [];
  displayedColumns: string[] = ['select', 'number', 'code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
    'recipientPhones', 'client', 'clientPrintNumber', 'country'
    , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
    , 'createdBy', 'date', 'diliveryDate', 'note'];
  dataSource = new MatTableDataSource([]);
  totalCount: number;
  noDataFound: boolean;
  countries: City[] = []
  paging: Paging = new Paging();
  /* select all prob*/
  selection = new SelectionModel<any>(true, []);
  selectAll: boolean = false;
  ordersIds = [];
  unSelectIds = [];
  countSelectOrder: number = 0;
  indeterminate: boolean = false;
  headerChekclable: string = "deselect all";
  lastMasterSelectionChoise: boolean = false;
  orders: any[] = []

  constructor(private orderService: OrderService,
    private userService: UserService,
    private customerService: CustomService,
    private clientService: ClientService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(res => {
      this.clients = res;
    });
    this.userService.ActiveAgent().subscribe((res) => {
      this.agents = res;
    });
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
    this.unSelectIds = [];
    this.orders = [];
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
        this.orders = this.orders.filter(c => c.id != row.id);
      }
      this.setCountSelectOrder(this.countSelectOrder - 1);
    }
  }
  ChangeAgentId() {
    var agent = this.agents.find((a) => a.id == this.agentId);
    this.countries = [];
    this.countries = agent.countries;
    this.countryId = null;
    this.dataSource = new MatTableDataSource([]);
  }

  getForzenInWay() {
    if (this.hour && this.currentDate && (this.isInStock || this.isInWay || this.isWithAgent)) {
      this.orderService.forzenInWay({
        hour: this.hour * 24,
        agentId: this.agentId,
        clientId: this.clientId,
        countryId: this.countryId,
        currentDate: this.currentDate,
        isInStock: this.isInStock,
        isInWay: this.isInWay,
        isWithAgent: this.isWithAgent
      }, this.paging).subscribe(res => {
        if (res) {
          this.noDataFound = false;
          this.dataSource = new MatTableDataSource(res.data);
          this.totalCount = res.total;
          if (this.selectAll) {
            this.dataSource.data.forEach(row => {
              this.selection.select(row);
            });
          }
          else
            if (this.lastMasterSelectionChoise) {

              this.dataSource.data.filter(row => this.unSelectIds.indexOf(row.id) == -1)
                .forEach(row => {
                  this.selection.select(row);
                });
            }
            else {
              this.dataSource.data.filter(row => this.ordersIds.indexOf(row.id) >= 0)
                .forEach(row => {
                  this.selection.select(row);
                });
            }
        }
        else
          this.noDataFound = true;
      })
    }
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.getForzenInWay();
  }
  printForzenInWay() {
    this.orderService.printFrozenInWay({
      filter: {
        hour: this.hour * 24,
        agentId: this.agentId,
        clientId: this.clientId,
        countryId: this.countryId,
        currentDate: this.currentDate,
        isInStock: this.isInStock,
        isInWay: this.isInWay,
        isWithAgent: this.isWithAgent
      },
      isSelectedAll: this.lastMasterSelectionChoise,
      selectedIds: this.ordersIds,
      exceptIds: this.unSelectIds
    }).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
    }, err => {
    })
  }
}
