import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AddStore } from 'src/app/Models/store/add-store.model';
import { StoreService } from 'src/app/services/store.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit {

  constructor(private clientService: ClientService,
    private storeService: StoreService,
    private notifications: NotificationsService,
    private router:Router,
    private getroute: ActivatedRoute,
  ) { }
  clients: Client[] = []
  Store: AddStore = new AddStore()
  submitted
  ngOnInit(): void {
    this.GetClient()
    this.GetStore()
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  } id
  GetStore() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.storeService.getByid(this.id).subscribe(res => {
      this.Store = res
    })
  }
  @ViewChild('fileInput') fileInput;
  public stageFile(): void {
    this.Store.Logo = this.fileInput.nativeElement.files[0];
  }
  AddStore() {
    console.log(this.Store)
    if (!this.Store.Name || !this.Store.MarketUrl
      || !this.Store.Logo || !this.Store.Description||!this.Store.ClientId) {
      this.submitted = true
      return
    }
    else
      this.submitted = false
    this.storeService.edit(this.Store).subscribe(res => {
      this.notifications.create('success', 'تم تعديل المتجر بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      // this.Store = new AddStore
      this.router.navigate(['/app/store'])
    })
  }
}
