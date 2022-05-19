import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReceiptOfTheOrderStatus } from 'src/app/Models/order/receipt-of-the-order-status.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-print-receipt-shipment',
  templateUrl: './print-receipt-shipment.component.html',
  styleUrls: ['./print-receipt-shipment.component.scss']
})
export class PrintReceiptShipmentComponent implements OnInit {

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
