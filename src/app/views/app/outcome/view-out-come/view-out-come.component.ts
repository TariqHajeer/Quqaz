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
@Component({
  selector: 'app-view-out-come',
  templateUrl: './view-out-come.component.html',
  styleUrls: ['./view-out-come.component.scss']
})
export class ViewOutComeComponent implements OnInit {

  constructor(private outcomeService: OutcomeService, public router: Router,
    private customService: CustomService,public UserService:UserService) { }
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
    this.toolbar = ['Search', 'Delete',];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5, pageSizes: true };
    this.gridInstance.on('data-ready', function () {
      this.dReady = true;
    });
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
    this.outcomeService.Get(this.filtering).subscribe(
      response => {
        this.outcomes = response;
      }
    )
  }
  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;

  }
  addFinish(value) {
    this.outcomes.push(value)
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
