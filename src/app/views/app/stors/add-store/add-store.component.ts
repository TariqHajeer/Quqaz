import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { AddStore } from 'src/app/Models/store/add-store.model';
import { StoreService } from 'src/app/services/store.service'
@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  constructor(private clientService: ClientService,
    private storeService: StoreService
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
    this.storeService.Add(this.Store).subscribe(res => {

    })
  }
}
