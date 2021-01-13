import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { from } from 'rxjs';
import { Outcome } from '../outcome.model'
import { OutcomeService } from '../outcome.service'
import { Filtering } from 'src/app/Models/Filtering.model'
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { UserService } from 'src/app/services/user.service';
import { CreateOutCome } from 'src/app/Models/OutCome/create-out-come.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-out-come',
  templateUrl: './view-out-come.component.html',
  styleUrls: ['./view-out-come.component.scss']
})
export class ViewOutComeComponent implements OnInit {

  constructor(private outcomeService: OutcomeService, public router: Router,
    private customService: CustomService,public UserService:UserService,
    public datepipe: DatePipe) { }
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
  outcomes: Outcome[] = [];
  editClicked: any;
  addClicked: any;
  filtering: Filtering
  coins: Coin[];
  exportTypes: any[] = [];
  
  ngOnInit(): void {
    this.filtering=new Filtering()
    this.Getcoins()
    this.UserService.GetAll();
    this.getExportTypes()
    this.getOutcomes();
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
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  getOutcomes() {
    if(this.filtering.ToDate){
      this.filtering.ToDate =this.datepipe.transform(this.filtering.ToDate, 'yyyy-MM-dd')
    }
    if(this.filtering.FromDate){
      this.filtering.FromDate =this.datepipe.transform(this.filtering.FromDate, 'yyyy-MM-dd') 
    }
    this.outcomeService.Get(this.filtering).subscribe(
      response => {
        this.outcomes = response;
        console.log(this.outcomes);
        this.outcomes.forEach(c=>{
          c.date =c.date.split('T')[0];
        });
      }
    )
  }
  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;

  }
  CreateOutcome:Outcome
  addFinish(value:CreateOutCome) {
    this.CreateOutcome.amount=value.Amount
    this.CreateOutcome.date=value.Date
    this.CreateOutcome.currencyId=value.CurrencyId
    this.CreateOutcome.outComeTypeId=value.OutComeTypeId
    this.CreateOutcome.note=value.Note
    this.CreateOutcome.reason=value.Reason
      this.outcomes.push(this.CreateOutcome)
    this.gridInstance.refresh();

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
  
}
