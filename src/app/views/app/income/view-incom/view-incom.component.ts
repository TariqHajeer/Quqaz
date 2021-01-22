import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CustomService } from 'src/app/services/custom.service';
import { Income } from '../income.model'
import { IncomeService } from '../income.service'
import { UserService } from 'src/app/services/user.service';
import { Filtering } from 'src/app/Models/Filtering.model';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { Router } from '@angular/router';
import { CreateIncome } from 'src/app/Models/inCome/create-income.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Paging } from 'src/app/Models/paging';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-incom',
  templateUrl: './view-incom.component.html',
  styleUrls: ['./view-incom.component.scss']
})
export class ViewIncomComponent implements OnInit {

  constructor(private incomeService: IncomeService,
    private customService: CustomService, public UserService: UserService,
    private router: Router) { }

  @ViewChild('normalgrid')

  incomes: Income[] = [];
  editClicked: any;
  addClicked: any;
  filtering: Filtering
  coins: Coin[] = [];
  importTypes: any[] = [];

  ///////////////
  displayedColumns: string[] = ['incomeType', 'currency', 'amount', 'date', 'source', 'earining', 'note', 'createdBy'];
  ;
  dataSource
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
    this.getImportTypes()
    this.Getcoins()
    this.UserService.GetAll();
    this.allFilter()
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
    this.incomeService.Get(this.filtering, this.paging).subscribe(response => {
      console.log(response)
      if (response.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      response.data.forEach(element => {
        element.date = element.date.split('T')[0];
      });
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    },
      err => {

      });
  }

  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;
  }

  Getcoins() {
    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
    });
  }
  getImportTypes() {
    this.customService.getAll("IncomeType").subscribe(
      res => {
        this.importTypes = res;
      }
    )
  }
  AddMoreOutcome() {
    this.router.navigate(['app/income/addmoreincome'])
  }

  createInCome: Income
  addFinish(value: CreateIncome) {
    this.createInCome.amount = value.Amount
    this.createInCome.Currency.id = value.CurrencyId
    this.createInCome.date = value.Date
    this.createInCome.earining = value.Earining
    this.createInCome.IncomeType.id = value.IncomeTypeId
    this.createInCome.note = value.Note
    this.createInCome.source = value.Source
    // this.dataSource.push(this.createInCome);
    this.allFilter();
  }
}
