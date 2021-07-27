import { Component, OnInit, ViewChild } from '@angular/core';
import { EditRequestService } from 'src/app/services/edit-request.service'
import { EditRequest } from 'src/app/Models/edit-request.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/Models/order/order.model';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-edit-client-orders',
  templateUrl: './edit-client-orders.component.html',
  styleUrls: ['./edit-client-orders.component.scss']
})
export class EditClientOrdersComponent implements OnInit {

  constructor(private editrequestService: EditRequestService) { }

  ngOnInit(): void {
    this.Get()
  }
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  noDataFound: boolean = false
  editRequest: EditRequest[] = []
  Get() {
    this.editrequestService.NewEditReuqet().subscribe(res => {
      console.log(res)
      this.editRequest=res
      if (this.editRequest.length == 0)
      this.noDataFound = true
    else this.noDataFound = false
    this.dataSource = new MatTableDataSource(this.editRequest);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['client','oldName', 'newName', 'oldUserName',
      'newUserName',  'Accept', 'DisAccept'];
    })
  }
  Accpet(id){
    this.editrequestService.Accpet(id).subscribe(res => {
     this.Get()
    })
  }
  DisAccpet(id){
    this.editrequestService.DisAccpet(id).subscribe(res => {
      this.Get()
    })
  }
}
