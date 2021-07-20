import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/Models/store/store.model'
import { EditSettingsModel, GridComponent, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-show-stores',
  templateUrl: './show-stores.component.html',
  styleUrls: ['./show-stores.component.scss']
})
export class ShowStoresComponent implements OnInit {

  constructor(private storeService: StoreService,
    private router: Router) { }
  stores: Store[] = []
  paging: Paging=new Paging()
  totalCount
  displayedColumns: string[] = ['name', 'marketUrl', 'logoPath', 'isActive', 'client', 'description','edit','delete'];
dataSource = new MatTableDataSource([]);
  baseUrl=environment.baseUrl
  ngOnInit(): void {
    this.GetStores()
   
  }
  
  GetStores() {
    this.storeService.get().subscribe(res => {
      this.stores = res
      this.dataSource=new MatTableDataSource(this.stores)
      this.totalCount=this.stores.length
      console.log(res)
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
  }
  Edit(id) {
    this.router.navigate(['/app/store/editstore',id])
  }
  delete(id){
    this.storeService.delete(id).subscribe(res=>{
      this.GetStores()
    })
  }
}
