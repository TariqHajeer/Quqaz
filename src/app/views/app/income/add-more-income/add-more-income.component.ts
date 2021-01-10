import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { Router } from '@angular/router';
import { CreateIncome } from 'src/app/Models/inCome/create-income.model';
import { UserService } from 'src/app/services/user.service';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-add-more-income',
  templateUrl: './add-more-income.component.html',
  styleUrls: ['./add-more-income.component.scss']
})
export class AddMoreIncomeComponent implements OnInit {

  submitted = false;
  Income: CreateIncome
  Incomes: CreateIncome[] = []
  coins: Coin[];
  importTypes: any[] = [];
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
  public coinsParams: IEditCell
  public importTypesParams: IEditCell
  public userTypesParams: IEditCell
  constructor(public IncomeService: IncomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    private userservic:UserService
  ) { }

  ngOnInit(): void {
    this.Income = new CreateIncome()
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
    this.gridInstance.on('data-ready', function () {
      this.dReady = true;
    });
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
    this.Getcoins()
    this.getOutComeType()
    this.GetUsers()
  }


  addOrEditUser() {
    this.submitted = true;
  }
  Getcoins() {

    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
      this.coinsParams = {
        params: {
          allowFiltering: true,
          dataSource: new DataManager(this.coins),
          fields: { text: 'العملة', value: 'name' },
          query: new Query(),
          actionComplete: () => false
        }
      };
    });
    this.coinsParams = { params: { popupHeight: '300px' } };
  }
  getOutComeType() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.importTypes = res;
        this.importTypesParams = {
          params: {
            allowFiltering: true,
            dataSource: new DataManager(this.importTypes),
            fields: { text: 'نوع الواردات', value: 'name' },
            query: new Query(),
            actionComplete: () => false
          }
        };
      }
    )
  }
  GetUsers(){
    this.userservic.GetAll()
    this.userTypesParams = {
      params: {
        allowFiltering: true,
        dataSource: new DataManager(this.userservic.users),
        fields: { text: 'الموظف', value: 'name' },
        query: new Query(),
        actionComplete: () => false
      }
    };
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

      this.Incomes.push(this.Income);
      this.notifications.create('success', 'تم اضافة صادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    }
    else if (args.action == "edit") {
      this.notifications.create('', 'تم التعديل', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    }

    else if (args.requestType == "delete") {
      this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    }
  }

  AddIncome() {
    this.IncomeService.AddMultiple(this.Incomes).subscribe(res=>{
      this.notifications.create('success', 'تم اضافة واردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Incomes = []
  })
   
  }
}
