import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/Models/store/store.model'
import { EditSettingsModel, GridComponent, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-show-stores',
  templateUrl: './show-stores.component.html',
  styleUrls: ['./show-stores.component.scss']
})
export class ShowStoresComponent implements OnInit {

  constructor(private storeService: StoreService,
    private router: Router) { }
  stores: Store[] = []
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
  baseUrl=environment.baseUrl
  ngOnInit(): void {
    this.GetStores()
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' }
      , 'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 10, pageSizes: true };
    this.selectionSettings = { type: "Multiple" };
    this.lines = 'Horizontal';
  }
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  GetStores() {
    this.storeService.get().subscribe(res => {
      this.stores = res
      console.log(res)
    })
  }
  actionComplete(args: SaveEventArgs) {
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if (args) {
        this.storeService.delete(id).subscribe(
          res => {
            // this.notifications.create('success', 'تم حذف  العميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
          }
        )
      }
      else {
        this.gridInstance.refresh();
      }
    }
  }
  onEditClicked(id) {
    this.router.navigate(['/app/store/editstore'], id)
  }
}
