import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-move-orders-to-agent-by-code',
  templateUrl: './move-orders-to-agent-by-code.component.html',
  styleUrls: ['./move-orders-to-agent-by-code.component.scss']
})
export class MoveOrdersToAgentByCodeComponent implements OnInit {

  constructor(private userService: UserService,
    private customService: CustomService,
    private orderService: OrderService) { }
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['index', 'code', 'client', 'country', 'note', 'edit'];
  noDataFound: string;
  filter: OrderFilter = new OrderFilter();
  agents: User[] = [];
  cities: any[] = [];
  cityApiName: string = 'Country';
  newAgents: User[] = [];
  newAgentId: number;
  ordersfilter: any[] = [];
  orders: any[] = [];
  ngOnInit(): void {
    this.getAgent();
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe((res) => {
      this.agents = res;
    });
  }
  ChangeAgentId() {
    this.cities = this.agents.find(a => a.id == this.filter.AgentId).countries;
    this.resetDataSource();
    this.getData();
  }
  ChangeCountry() {
    this.customService.getAll(this.cityApiName).subscribe(res => {
      this.newAgents = res.find(c => c.id == this.filter.CountryId).agnets.filter(a => a.id != this.filter.AgentId);
      this.resetDataSource();
      this.getData();
    })
  }
  resetDataSource() {
    this.ordersfilter = [];
    this.orders = [];
    this.dataSource = new MatTableDataSource([]);
  }
  getData() {
    this.ordersfilter = [];
    if (this.filter.AgentId && this.filter.CountryId) {
      this.orderService.WithoutPaging(this.filter).subscribe(res => {
        if (res.length > 1) {
          this.ordersfilter = res;
        }
        else if (res.length == 1) {
          this.ordersfilter = [];
          if (this.findOrderInTable()) {
            return;
          }
          else {
            this.orders.unshift(res[0]);
            this.addOrder();
          }
        }
        else if (res.length == 0) {

        }
      }, err => {

      })
    }
  }
  findOrderInTable(): boolean {
    return this.orders.filter(o => o.code == this.filter.Code).length > 0;
  }
  addOrder() {
    this.dataSource = new MatTableDataSource(this.orders);
  }
  showTable(): boolean {
    return this.ordersfilter.length > 0;
  }
  add(order) {
    if (this.findOrderInTable()) {
      this.cancel(order);
      return;
    }
    else {
      this.orders.unshift(order);
      this.addOrder();
      this.cancel(order);
    }
  }
  cancel(order) {
    this.ordersfilter = this.ordersfilter.filter(o => o != order);
  }

  moveOrder() {

  }
}
