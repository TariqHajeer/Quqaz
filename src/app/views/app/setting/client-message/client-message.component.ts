import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ClientMessageService } from 'src/app/services/client-message.service';
import { Paging } from 'src/app/Models/paging';
import { MatTableDataSource } from '@angular/material/table';

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
  isPublished: boolean = false;
  constructor(
    private notifications: NotificationsService,
    private clientMessageService: ClientMessageService
  ) { }

  ngOnInit(): void {
    this.getClientMessage();
  }
  getClientMessage() {
    this.clientMessageService.getClientMessage(this.paging, this.isPublished).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data.data);
      }
    })
  }
  Accept(id) {
    this.clientMessageService.publishClientMessage(id).subscribe({
      next: (data) => {
        this.getClientMessage();
      }
    })
  }

  DisAccept(id) {
    this.clientMessageService.unPublishClientMessage(id).subscribe({
      next: (data) => {
        this.getClientMessage();
      }
    })
  }
  delete(id) {
    this.clientMessageService.deleteClientMessage(id).subscribe({
      next: (data) => {
        this.getClientMessage();
      }
    })
  }
}
