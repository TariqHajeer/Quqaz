import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Router } from '@angular/router';
import { CreateIncome } from 'src/app/Models/inCome/create-income.model';
import { UserService } from 'src/app/services/user.service';
import { IncomeService } from '../income.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-more-income',
  templateUrl: './add-more-income.component.html',
  styleUrls: ['./add-more-income.component.scss']
})
export class AddMoreIncomeComponent implements OnInit {

  submitted = false;
  Incomes: any[] = []
  importTypes
  apiName = "Currency";
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
  public importTypesParams: IEditCell
  public userTypesParams: IEditCell
  public inComeTypeDs: DataManager;
  public CurrencyDs: any;
  public UserDs: any;
  public dateFormatOptions: any = {type:'date', format:'dd/MM/yyyy'};
 inComeTypeapi = environment.baseUrl + "api/IncomeType";
 Currencyapi = environment.baseUrl + "api/Currency";
 Userapi = environment.baseUrl + "api/User";
 public requiredValidation;

  constructor(public IncomeService: IncomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    private userservic:UserService,
    private spinner: NgxSpinnerService
    
  ) { }

  ngOnInit(): void {
    this.getIncomeType()

  var token=  localStorage.getItem('token')
    this.requiredValidation={ required:[true,"هذا الحقل مطلوب"]};
    // this.CurrencyDs = new DataManager({ url: this.Currencyapi });
    // this.UserDs = new DataManager({ url: this.Userapi });
    this.editSettings = { showDeleteConfirmDialog: true, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = [
      { text: 'اضافة', tooltipText: 'اضافة', prefixIcon: 'e-add', id: 'normalgrid_add' },
      { text: 'تعديل', tooltipText: 'تعديل', prefixIcon: 'e-edit', id: 'normalgrid_edit' },
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      { text: 'حفظ', tooltipText: 'حفظ', prefixIcon: 'e-update', id: 'normalgrid_update' },
      { text: 'تراجع', tooltipText: 'تراجع', prefixIcon: 'e-cancel', id: 'normalgrid_cancel' },
      'Search'];
    // this.toolbar = ['Add', 'Search', 'Edit', 'Delete', 'Update', 'Cancel'];

    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };
    this.selectionSettings = {  type: "Multiple" };
    this.lines = 'Horizontal';
  }


  addOrEditUser() {
    this.submitted = true;
  }
  getIncomeType() {
    this.customService.getAll('IncomeType').subscribe(
      res => {
        this.importTypes = res;
        this.inComeTypeDs =new DataManager()
        this.inComeTypeDs.dataSource.data=res as JSON
      }
    )
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

    else if (args.requestType == "delete") {
    }
  }

  AddIncome() {
    this.spinner.show()
    this.IncomeService.AddMultiple(this.Incomes).subscribe(res=>{
     this.spinner.hide()
      this.notifications.create('success', 'تم اضافة واردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Incomes = []
  }, err => {
    this.spinner.hide()
  })
   
  }
}
