import { Component, OnInit, ViewChild } from '@angular/core';
import { EditRequestService } from 'src/app/services/edit-request.service'
import { EditRequest } from 'src/app/Models/edit-request.model'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/Models/order/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';
@Component({
  selector: 'app-edit-client-orders',
  templateUrl: './edit-client-orders.component.html',
  styleUrls: ['./edit-client-orders.component.scss']
})
export class EditClientOrdersComponent implements OnInit {

  constructor(private editrequestService: EditRequestService,
    private clientService: ClientService,
    private notifications: NotificationsService,) { }

  ngOnInit(): void {
    this.Get()
    this.getClient()
  }
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  noDataFound: boolean = false
  editRequest: EditRequest[] = []
  clients: Client[] = [];
  nameIsRepeated: boolean = false;
  usernameIsRepeated: boolean = false;
  Get() {
    this.editrequestService.NewEditReuqet().subscribe(res => {
      console.log(res)
      this.editRequest = res
      if (this.editRequest.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      this.dataSource = new MatTableDataSource(this.editRequest);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['client', 'oldName', 'newName', 'oldUserName',
        'newUserName', 'Accept', 'DisAccept'];
    })
  }
  Accpet(element: EditRequest) {
    if (this.checkName(element.newName) && element.newName != element.oldName) {
      this.notifications.create('error', 'الاسم مكرر', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.nameIsRepeated=true
    }
    else
    this.nameIsRepeated=false
    if (this.checkUserName(element.newUserName) && element.oldUserName != element.newUserName) {
      this.notifications.create('error', 'اسم المستخدم مكرر', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.usernameIsRepeated=true
    }
    else
    this.usernameIsRepeated=false
    if(  this.nameIsRepeated||  this.usernameIsRepeated)return
    else
    this.editrequestService.Accpet(element.id).subscribe(res => {
     this.Get()
    })
  }
  DisAccpet(id) {
    this.editrequestService.DisAccpet(id).subscribe(res => {
      this.Get()
    })
  }
  getClient() {
    this.clientService.getClients().subscribe(
      res => {
        this.clients = res
      }
    )
  }
  checkName(name): boolean {
    if (this.clients.filter(c => c.name == name).length > 0) {
      return true
    } else
      return false
  }
  checkUserName(userName): boolean {
    if (this.clients.filter(c => c.userName == userName).length > 0) {
      return true
    } else
      return false
  }
}
