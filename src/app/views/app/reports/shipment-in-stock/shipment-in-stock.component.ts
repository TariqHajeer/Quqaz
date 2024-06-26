import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';


@Component({
  selector: 'app-shipment-in-stock',
  templateUrl: './shipment-in-stock.component.html',
  styleUrls: ['./shipment-in-stock.component.scss']
})
export class ShipmentInStockComponent implements OnInit {
  displayedColumns: string[] = ['select','index', 'code', 'client','cost', 'country', 'region'
    , 'orderplaced'];
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
    this.orders=[]
    this.ids=[]
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ids: any[] = []
  orders: any[] = []
  checkboxId(row) {  
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row.id).length > 0)
        return
      else {
        this.ids.push(row.id)
        this.orders.push(row)
        this.agent=this.orders.map(o=>o.agent)[0]
        this.orderplaced=this.orders.map(o=>o.orderplaced)[0]
      
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.id)
      this.orders = this.orders.filter(o => o != row)
      
    }
  }
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router
  ) { }
  AgentId
  OrderplacedId
  orderPlace: NameAndIdDto[] = []
  Agents: User[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false

  @Input() totalCount: number;

  ngOnInit(): void {
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')
    this.getAgent()
    this.paging = new Paging
    this.filtering = new OrderFilter
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  cities=[]
  ChangeAgentIdOrOrderplacedId() {
    if (this.AgentId) {
      this.filtering.AgentId=this.AgentId
      this.cities=[]
      this.filtering.CountryId=null
      var agent=this.Agents.find(a=>a.id==this.filtering.AgentId)
      this.cities=agent.countries
      this.allFilter();
    }

  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.filtering.Orderplaced = OrderplacedEnum.Store;
    this.orderservice.getInStockToTransferWithAgent(this.filtering, this.paging).subscribe(response => {
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
    },
      err => {

      });
  }
  agent=this.orders.map(o=>o.agent)[0]
  orderplaced=this.orders.map(o=>o.orderplaced)[0]
  print() {
    if ( this.noDataFound == true || this.orders.length==0) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    localStorage.setItem('printagent',JSON.stringify(this.Agents.find(c=>c.id==this.AgentId)))

    localStorage.setItem('printordersagent',JSON.stringify(this.orders))
    this.route.navigate(['app/reports/printagentpreview'])
   
  }
  afterPrint() {
    this.orderservice.MakeOrderInWay(this.orders.map(o=>o.id)).subscribe(res=>{
      this.notifications.create('success', 'تم نقل الطلبيات من المخزن الى الطريق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.orders=[]
      this.allFilter()
    })
  }     
}
