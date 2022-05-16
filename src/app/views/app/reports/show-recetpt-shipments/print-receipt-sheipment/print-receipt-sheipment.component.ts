import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { ReceiptOfTheOrderStatus } from 'src/app/Models/order/receipt-of-the-order-status.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-print-receipt-sheipment',
  templateUrl: './print-receipt-sheipment.component.html',
  styleUrls: ['./print-receipt-sheipment.component.scss'],
})
export class PrintReceiptSheipmentComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    public getroute: ActivatedRoute
  ) {}
  id: number;
  receiptOfTheOrderStatus: ReceiptOfTheOrderStatus =
    new ReceiptOfTheOrderStatus();
  displayedColumns: string[] = [
    'id',
    'orderCode',
    'client',
    'cost',
    'agent',
    'agentCost',
    'orderPlaced',
    'moneyPlaced',
  ];
  dataSource;
  @Input() totalCount: number;
  noDataFound: boolean = false;
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.getroute.params.subscribe((par) => {
      this.id = par['id'] as any;
      this.orderService.ReceiptOfTheOrderStatu(this.id).subscribe((res) => {
        this.receiptOfTheOrderStatus.receiptOfTheOrderStatusDetalis = [];
        this.receiptOfTheOrderStatus = res.data;
        this.dataSource = new MatTableDataSource(
          this.receiptOfTheOrderStatus.receiptOfTheOrderStatusDetalis
        );
      });
    });
  }
}
