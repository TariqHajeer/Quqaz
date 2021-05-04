import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Outcome } from '../outcome.model'
import { OutcomeService } from '../outcome.service'
import { Filtering } from 'src/app/Models/Filtering.model'
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Paging } from 'src/app/Models/paging';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-view-out-come',
  templateUrl: './view-out-come.component.html',
  styleUrls: ['./view-out-come.component.scss']
})
export class ViewOutComeComponent implements OnInit {

  constructor(private outcomeService: OutcomeService, public router: Router,
    private customService: CustomService, public UserService: UserService,
    public datepipe: DatePipe) { }
  @ViewChild('normalgrid')
  outcomes: Outcome[] = [];
  outcome: any;
  addClicked: any;
  filtering: Filtering
  coins: Coin[];
  exportTypes: any[] = [];
  totalRecoreds: number;
  displayedColumns: string[] = ['outComeType', 'amount',  'date', 'reason', 'note',"createdBy", "Edit","Delete"];
  dataSource: MatTableDataSource<Outcome>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  noDataFound: boolean = false

  ////////////
  ngOnInit(): void {

    this.paging = new Paging

    this.filtering = new Filtering()
    this.Getcoins()
    this.UserService.GetAll();
    this.getExportTypes()
    this.allFilter()
  }
  get() {
    this.dataSource = new MatTableDataSource(this.outcomes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['outComeType','amount','currency'
    ,'date','reason','note','edit'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.outcomeService.Get(this.filtering, this.paging).subscribe(response => {
      if (response.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      response.data.forEach(e => {
        e.date = e.date.split('T')[0];
      });
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total

    },
      err => {

      });
  }

  addNewClicked() {
    this.addClicked = true;
  }
  onEditClicked(item){
    this.addClicked = false;
    this.outcome=item

  }
 
  addFinish(args) {
    this.allFilter();
  }
  AddMoreOutcome() {
    this.router.navigate(['app/outcome/addmore'])
  }
  Getcoins() {
    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
    });
  }
  getExportTypes() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.exportTypes = res;
      }
    )
  }
  delete(element) {

    this.outcomeService.Delete(element.id).subscribe(res => {
      let index = this.dataSource.data.indexOf(element);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    })
  }

}
