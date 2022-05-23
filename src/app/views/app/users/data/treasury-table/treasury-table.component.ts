import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Paging } from 'src/app/Models/paging';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { UserService } from 'src/app/services/user.service';
import { TreasuryService } from 'src/app/services/treasury.service';

@Component({
  selector: 'app-treasury-table',
  templateUrl: './treasury-table.component.html',
  styleUrls: ['./treasury-table.component.scss'],
})
export class TreasuryTableComponent implements OnInit {
  constructor(
    public UserService: UserService,
    private treasuryService: TreasuryService,
    private notifications: NotificationsService,
    private router: Router
  ) {}
  noDataFound: boolean;
  displayedColumns: string[] = ['amount', 'type', 'createdOnUtc', 'more'];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  treasury: Treasury;
  paging: Paging = new Paging();
  total: number;
  @Input() id: number;
  ngOnInit(): void {
    this.getTreasury()
  }
  getTreasury() {
    this.treasury = new Treasury();
    this.treasuryService.getByUserId(this.id).subscribe((res) => {
      if (res) {
        this.treasury = res;
        this.dataSource = new MatTableDataSource(this.treasury.history.data);
        this.total=this.treasury.history.total
        console.log(res)
      }
    });
  }
  getByPaging() {
    this.treasuryService
      .Hisotry(this.treasury.id, this.paging)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
      });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getByPaging();
  }



  clientPayment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  cashMovment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  receipt(id) {
    this.router.navigate(['/app/reports/printclientreciptandexchange/', id]);
  }
  receiptOfTheOrderStatus(id) {
    this.router.navigate(['/app/reports/printReceiptShipments/', id]);
  }
  income(id) {
    this.router.navigate(['/app/reports/printReceiptShipments/', id]);
  }
  outcome(id) {
    this.router.navigate(['/app/reports/printReceiptShipments/', id]);
  }
}
