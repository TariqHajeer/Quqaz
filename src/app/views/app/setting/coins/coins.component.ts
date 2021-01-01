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
  public toolbar: ToolbarItems[];
  public pageSettings: Object;
  ngOnInit(): void {
    this.Get();
    this.editSettings = { showDeleteConfirmDialog: true, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = ['Add', 'Search', 'Edit', 'Delete', 'Update', 'Cancel'];
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
    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
    });
  }
  actionComplete(args: SaveEventArgs) {
    if (args.action == 'add') {
      let obj: any = { name: args.data['name'] }
      console.log(obj)
      this.customService.addOrUpdate('Currency', obj, 'add').subscribe(
        res => {
          this.notifications.create('success', 'تم اضافة نوع الواردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.Get();
        }
      )
    }
  }
  onActionBegin(args: ActionEventArgs) {
    if (args.action == "add") {
      if(args.requestType=="save"){
        var name= args.data["name"];
        if(this.coins.filter(c=>c.name==name).length>0){
          this.notifications.create('', 'يوجد اسم مماثل', NotificationType.Warn, {  timeOut: 6000, showProgressBar: false });          
          args.cancel =true;
        }
        if(args.data["name"]==""){
          this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, {  timeOut: 6000, showProgressBar: false });          
        args.cancel =true;
        }
      }
    }
  }


}
