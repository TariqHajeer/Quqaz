import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateWithIds } from 'src/app/Models/date-with-ids.model';
import { Order } from 'src/app/Models/order/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-new-order',
  templateUrl: './view-new-order.component.html',
  styleUrls: ['./view-new-order.component.scss']
})
export class ViewNewOrderComponent implements OnInit {
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false

  constructor(private OrderService: OrderService) { }

  ngOnInit(): void {
    this.get()
    // this.order = new Order()
  }
  // ngOnChanges() {
  //   this.print()
  // }
  get() {
    this.OrderService.GetNewOrder().subscribe(res => {
      // console.log(res)
      this.orders = res
      this.orders.forEach(res=>{
        res.recipientPhones = res.recipientPhones.split(',')
      })
      if (this.orders.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['code', 'cost', 'recipientName',
        'recipientPhones', 'address', 'note', 'client', 'country'
        , 'region', 'agent', 'Accept', 'DisAccept'];
    })

  }
  order: Order = new Order
  Accept(element,i) {
    this.OrderService.Accept(element.id).subscribe(res => {
      this.order = element
      this.get()
      this.print(i)
    })
  }
  dateWithId:DateWithIds<number>
  DisAccept(elementid) {
    this.dateWithId.Date=new Date
    this.dateWithId.Ids.push(elementid)
    this.OrderService.DisAccept(this.dateWithId).subscribe(res => {
      this.orders=this.orders.filter(o=>o.id!=elementid)
      this.dataSource = new MatTableDataSource(this.orders);

      // this.get()
    })
  }
  print(i) {
    console.log(this.order)
    var divToPrint = document.getElementById('contentToConvert-'+i);
    var css = '@page { size: A5 landscape }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
      // this.get()

    }, 10);
  }
  code
  codeFillter() {
    this.dataSource.data=this.orders
    if(this.code)
    if(this.dataSource.data.length!=0)
   this.dataSource.data= this.dataSource.data.filter(d=>d.code.includes(this.code))
  }
}
