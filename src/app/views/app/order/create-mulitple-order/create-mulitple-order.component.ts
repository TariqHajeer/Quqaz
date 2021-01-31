import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from '../../client/client.service';


@Component({
  selector: 'app-create-mulitple-order',
  templateUrl: './create-mulitple-order.component.html',
  styleUrls: ['./create-mulitple-order.component.scss']
})
export class CreateMulitpleOrderComponent implements OnInit {

  submitted = false;
  Orders: any[] = []

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

  public CountryDs: any;
  public dateFormatOptions: any = {type:'date', format:'dd/MM/yyyy'};
  Countryapi = environment.baseUrl + "api/Country";
  public requiredValidation;


  constructor(private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService
    
  ) { }

  ngOnInit(): void {
    this.requiredValidation={ required:[true,"هذا الحقل مطلوب"]};
    this.CountryDs = new DataManager({ url: this.Countryapi });
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


  actionComplete(args: SaveEventArgs) {

    if (args.action == 'add') {
      if (args.requestType == "save") {
       // args.data["date"] = new Date(args.data["data"]);
        //     this.notifications.create('', 'تم التعديل', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

      }
    }
  

    else if (args.requestType == "delete") {
     // this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }
  }

  AddOrder() {
    this.orderservice.Creat(this.Orders).subscribe(res=>{
      this.notifications.create('success', 'تم اضافة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Orders = []
  })
   
  }
}
