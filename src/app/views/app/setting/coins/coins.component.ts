import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from '../../../../Models/Coins/coin.model';
import { CreateCoin } from '../../../../Models/Coins/create-coin.model';
import { UpdateCoin } from '../../../../Models/Coins/update-coin.model';
@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  apiName = "Currency";
  constructor(private customService: CustomService, private notifications: NotificationsService) { }

  // coins:any[]=[{id:1,name:'دولار'},{id:2,name:'درهم عراقي'},{id:3,name:'ليرة لبناني'}];
  coins: Coin[];
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
  ngOnInit(): void {
    this.Get();
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
  }

  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  Get() {
    this.customService.getAll(this.apiName).subscribe(res => {
      this.coins = res;
    });
  }
  actionComplete(args: SaveEventArgs) {
    let coin = args.data[0] as Coin;
    if (args.action == 'add') {
      let obj: any = { name: args.data['name'] }
      this.customService.addOrUpdate(this.apiName, obj, 'add').subscribe(
        res => {
          this.notifications.create('success', 'تم اضافة نوع الواردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.coins.push(res);
        },
      )
    }
    else if (args.action == "edit") {
      this.customService.addOrUpdate(this.apiName, coin, 'update').subscribe(res => {
        this.notifications.create('', 'تم التعديل', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      });
    }

    else if (args.requestType == "delete") {
      this.customService.delete(this.apiName, coin.id).subscribe(res => {
        this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      });

    }
  }
  onActionBegin(args: ActionEventArgs) {
     let name= args.data["name"].trim();
    if (args.action == "add") {
      if (args.requestType == "save") {
        if (this.coins.filter(c => c.name == name).length > 0) {
          this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        }
        if (name == "") {
          this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        }
      }
    }
    if (args.action == "edit") {
      var id = args.data["id"];
      if (name== "") {
        this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
      if(this.coins.filter(c=>c.name==name&&c.id!=id).length>0){
        this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel= true;
      }
    
    }
    if (args.requestType == "delete") {
      let coin = args.data[0] as Coin;
      if (!coin.canDelete) {
        this.notifications.create('', 'لا يمكن الحذف', NotificationType.Error, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
    }
  }


}
