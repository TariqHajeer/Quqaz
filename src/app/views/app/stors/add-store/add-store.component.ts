import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { AddStore } from 'src/app/Models/store/add-store.model';
import { StoreService } from 'src/app/services/store.service'
import { NotificationsService, NotificationType } from 'angular2-notifications';
@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  constructor(private clientService: ClientService,
    private storeService: StoreService,
    private notifications: NotificationsService,
  ) { }
  clients: Client[] = []
  Store: AddStore = new AddStore()
  submitted
  ngOnInit(): void {
    this.GetClient()
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  @ViewChild('fileInput') fileInput;
  public stageFile(): void {
    this.Store.Logo = this.fileInput.nativeElement.files[0];
  }
  AddStore() {
    console.log(this.Store)
    if(!this.Store.Name||!this.Store.MarketUrl
      ||!this.Store.Logo||!this.Store.Description||!this.Store.ClientId){
        this.submitted=true
        return
      }
      else
      this.submitted=false
    this.storeService.Add(this.Store).subscribe(res => {
      this.notifications.create('success', 'تم اضافة متجر بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Store = new AddStore
    })
  }
}
