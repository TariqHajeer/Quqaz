import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { BranchesService } from 'src/app/services/branches.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-views-print-transfer-to-second-branch',
  templateUrl: './views-print-transfer-to-second-branch.component.html',
  styleUrls: ['./views-print-transfer-to-second-branch.component.scss']
})
export class ViewsPrintTransferToSecondBranchComponent implements OnInit {
  displayedColumns: string[] = ['printNmber', 'printerName', 'date', 'driverName', 'destinationBranch'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging = new Paging();
  destinationBranchId: any;
  noDataFound: boolean = false;
  branches: any[] = [];
  code: number;
  moveNumber:number;
  constructor(public orderService: OrderService,
    private router: Router,
    private branchesService: BranchesService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getBranches();
  }
  getBranches() {
    this.branchesService.Get().subscribe(res => {
      this.branches = res?.filter(data => data.id != this.authService.getUser().branche.id);
    })
  }
  Get() {
    this.orderService.GetPrintsTransferToSecondBranch(this.paging, this.destinationBranchId).subscribe(res => {
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
    this.router.navigate(['/app/reports/ViewsPrintTransferToSecondBranch/', order.id])
  }
}
