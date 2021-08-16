import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Order } from 'src/app/Models/order/order.model';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-orders-with-client',
  templateUrl: './orders-with-client.component.html',
  styleUrls: ['./orders-with-client.component.scss']
})
export class OrdersWithClientComponent implements OnInit {

  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false
  clients: Client[] = []

  constructor(private OrderService: OrderService,
    private clientService: ClientService) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;
  filtering: OrderFilter=new OrderFilter()
  ngOnInit(): void {
    this.GetClient()
    this.get()
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  get() {
    this.OrderService.OrderAtClient(this.filtering).subscribe(res => {
      console.log(res)
      this.orders = res
      this.orders.forEach(res => {
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
        , 'region', 'agent', 'print'];
    })

  }
 
 
  print(i) {
   
    var divToPrint = document.getElementById('contentToConvert-' + i);
    var css = '@page { size: A5 landscape ;margin: 0;color-adjust: exact;-webkit-print-color-adjust: exact;}',
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
      

    }, 10);
  }


}
