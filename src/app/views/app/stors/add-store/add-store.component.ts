import { Component, OnInit } from '@angular/core';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import {AddStore} from 'src/app/Models/store/add-store.model';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  constructor(private clientService: ClientService
  ) { }
  clients: Client[] = []
  Store:AddStore=new AddStore()
  submitted
  ngOnInit(): void {
    this.GetClient()
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  AddStore() {

  }
}
