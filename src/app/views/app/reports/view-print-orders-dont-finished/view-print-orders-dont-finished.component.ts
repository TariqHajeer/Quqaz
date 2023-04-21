import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
@Component({
  selector: 'app-view-print-orders-dont-finished',
  templateUrl: './view-print-orders-dont-finished.component.html',
  styleUrls: ['./view-print-orders-dont-finished.component.scss']
})
export class ViewPrintOrdersDontFinishedComponent implements OnInit {
  displayedColumns: string[] = ['printNmber', 'printerName', 'date'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging = new Paging();
  clientId: number;
  noDataFound: boolean;
  clients: Client[] = [];
  constructor(public orderService: OrderService,
    private router: Router,
    public clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }
  getClients() {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }
  Get() {
    this.orderService.GetPrintsTransferToSecondBranch(this.paging, this.clientId).subscribe(res => {
      if (res.data.length == 0)
        this.noDataFound = true;
      else
        this.noDataFound = false;
      this.dataSource = new MatTableDataSource(res.data);
      this.totalCount = res.total;
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.Get();
  }
  print(order) {
    this.orderService.orderDetials = order;
    this.router.navigate(['/app/reports/viewPrintOrdersDontFinishedDetils/', order.id])
  }
}
