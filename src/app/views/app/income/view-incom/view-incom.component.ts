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
  public stTime: any;
  public filter: Object;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public selectionSettings: Object;
  public lines: any;
  @ViewChild('normalgrid')
  public gridInstance: GridComponent;
  public toolbar: Object[];
  public pageSettings: Object;
  incomes: Income[] = [];
  editClicked: any;
  addClicked: any;
  filtering: Filtering
  coins: Coin[];
  importTypes: any[] = [];

///////////////
displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  ////////////
  ngOnInit(): void {
    this.get()
    this.paging = new Paging

    this.filtering = new Filtering()
    this.Getcoins()
    this.UserService.GetAll();
    this.getImportTypes()
    this.getIncomes();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5, pageSizes: true };
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
  }
  get() {
    this.dataSource = new MatTableDataSource(this.incomes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['incomeTypeId','amount','date','source','earining','note','userId'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
   
    this.paging.allItemsLength=event.length
    this.paging.RowCount =  event.pageSize
    this.paging.Page = event.pageIndex+1
   
   
 this.allFilter();
    
   }
   allFilter(){
   this.incomeService.Get(this.filter, this.paging).subscribe(response => {
     this.dataSource=new MatTableDataSource(response.data)
     this.totalCount = response.total
    
   },
   err => {
     
   });
  }
  
  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;
  }

  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  getIncomes() {
    this.incomeService.Get(this.filter, this.paging).subscribe(

      res => {
        console.log(res);
         this.incomes=res;
      }
    )
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
  
  createInCome:Income
  addFinish(value:CreateIncome) {
    this.createInCome.amount=value.Amount
    this.createInCome.Currency.id=value.CurrencyId
    this.createInCome.date=value.Date
    this.createInCome.earining=value.Earining
    this.createInCome.IncomeType.id=value.IncomeTypeId
    this.createInCome.note=value.Note
    this.createInCome.source=value.Source
    this.dataSource.push( this.createInCome)
    this.gridInstance.refresh();

  }
}
