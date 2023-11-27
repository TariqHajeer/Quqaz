import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ClientMessageService } from 'src/app/services/client-message.service';
import { Paging } from 'src/app/Models/paging';

@Component({
  selector: 'app-client-message',
  templateUrl: './client-message.component.html',
  styleUrls: ['./client-message.component.scss']
})
export class ClientMessageComponent implements OnInit {
  displayedColumns: string[] = ["logo", "name", "message", "Accept", "DisAccept", "delete"];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  noDataFound: boolean = false;
  paging: Paging = new Paging();
  constructor(
    private notifications: NotificationsService,
    private clientMessageService: ClientMessageService
  ) { }

  ngOnInit(): void {
    this.clientMessageService.getClientMessage(this.paging).subscribe({
      next: (data) => {

      }
    })
  }

  Accept(id) {
    this.clientMessageService.publishClientMessage(id).subscribe({
      next: (data) => {

      }
    })
  }

  DisAccept(id) {
    this.clientMessageService.unPublishClientMessage(id).subscribe({
      next: (data) => {

      }
    })
  }
  delete(id) {
    this.clientMessageService.deleteClientMessage(id).subscribe({
      next: (data) => {

      }
    })
  }
}
