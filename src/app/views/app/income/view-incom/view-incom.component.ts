import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { CustomService } from 'src/app/services/custom.service';
import { Income } from '../income.model'
import { IncomeService } from '../income.service'
import { UserService } from 'src/app/services/user.service';
import { Filtering } from 'src/app/Models/Filtering.model';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { Router } from '@angular/router';

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
  public toolbar: ToolbarItems[];
  public pageSettings: Object;
  incomes: Income[] = [];
  editClicked: any;
  addClicked: any;
  filtering: Filtering
  coins: Coin[];
  importTypes: any[] = [];
  ngOnInit(): void {
    this.filtering = new Filtering()
    this.Getcoins()
    this.UserService.GetAll();
    this.getImportTypes()
    this.getIncomes();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = ['Search', 'Delete',];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5, pageSizes: true };
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
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
    this.incomeService.Get(this.filtering).subscribe(

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
  Test(){
    console.log(this.filtering);
    this.incomeService.Get(this.filterSettings).subscribe(res=>{

    });
  }

}
