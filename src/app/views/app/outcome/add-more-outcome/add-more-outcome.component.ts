import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { CreateOutCome } from 'src/app/Models/OutCome/create-out-come.model';
import { OutcomeService } from 'src/app/views/app/outcome/outcome.service';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-more-outcome',
  templateUrl: './add-more-outcome.component.html',
  styleUrls: ['./add-more-outcome.component.scss']
})
export class AddMoreOutcomeComponent implements OnInit {
  submitted = false;
  tempId: 1;
  public OutComes: CreateOutCome[] = []
  coins: Object[] = [];
  exportTypes
  apiName = "Currency";
  coinsapi = environment.baseUrl + "api/Currency";
  OutComeTypeapi = environment.baseUrl + "api/OutComeType";
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
  public gridDs: any;
  public outComeTypeDs: DataManager;
  public coinDs: any;
  public dateFormatOptions: any = { type: 'date', format: 'dd/MM/yyyy' };
  public requiredValidation = { required: [true, "هذا الحقل مطلوب"] };

  constructor(public OutcomeService: OutcomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    public datepipe: DatePipe,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.GetOutComeType()
    // this.Getcoins() 
    // this.coinDs = new DataManager({url:this.coinsapi})
    this.editSettings = { showDeleteConfirmDialog: false, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = [
      { text: 'اضافة', tooltipText: 'اضافة', prefixIcon: 'e-add', id: 'normalgrid_add' },
      { text: 'تعديل', tooltipText: 'تعديل', prefixIcon: 'e-edit', id: 'normalgrid_edit' },
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      { text: 'حفظ', tooltipText: 'حفظ', prefixIcon: 'e-update', id: 'normalgrid_update' },
      { text: 'تراجع', tooltipText: 'تراجع', prefixIcon: 'e-cancel', id: 'normalgrid_cancel' },
      'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };
    this.selectionSettings = { type: "Multiple" };
    this.lines = 'Horizontal';

  }


  addOrEditUser() {
    this.submitted = true;
  }


  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }


  actionComplete(args: SaveEventArgs) {

    if (args.action == 'add') {
      if (args.requestType == "save") {
      }
    }
    // else if (args.action == "edit") {
    //   // this.notifications.create('', 'تم التعديل', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    // }

    else if (args.requestType == "delete") {
      this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }
  }
  AddOutcome() {
    if (this.OutComes.length == 0)
      return;
    this.OutComes.forEach(c => {
      c.Date = this.datepipe.transform(c.Date, 'yyyy-MM-dd');
    });
    this.spinner.show()
    this.OutcomeService.CreateMulitpleOutCome(this.OutComes).subscribe(res => {
      this.notifications.create('', 'تم اضافة صادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.OutComes = []
      this.spinner.hide()
    },err=>{
      this.spinner.hide()
    });

  }
  GetOutComeType() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.exportTypes = res;
        this.outComeTypeDs = new DataManager()
        this.outComeTypeDs.dataSource.data = res as JSON

      }
    )
  }
  Getcoins() {
    this.customService.getAll(this.apiName).subscribe(res => {
      this.coins = res;
      this.coinDs = res as object[]
    });
  }
}
