import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private customService: CustomService,private clientService:ClientService,
    private notifications: NotificationsService,
    private getroute: ActivatedRoute,
    private router:Router) { }
  client: Client;
  regions: any[] = [];
  tempPhone: any;
  id
  submitted
  ngOnInit(): void {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.init();
    this.getRegions();
    this.getClientById()
  }
  
  init() {
    this.client = {
      id: null,
      name: null,
      password: null,
      userName: null,
      address: null,
      canDelete: null,
      firstDate: null,
      note: null,
      phones: [],
      regionId: null,
    }
  }
  getClientById() {
    this.clientService.getClients().subscribe(
      res=>{
       this.client=res.find(c=>c.id==this.id)
      }
    )
  }

  addOrEditClient() {
   
    if (this.tempPhone)
      this.client.phones.push(this.tempPhone)

    this.clientService.Update(this.client).subscribe(
      res => {
         this.notifications.create('success', 'تم تعديل عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.router.navigate(['/app/client'])

      }
    )
  }
  getRegions() {
    this.customService.getAll('Region').subscribe(
      res => {
        this.regions = res;
      }
    )
  }

  addNewPhone() {
    this.client.phones.push(this.tempPhone);
    this.tempPhone = '';
  }

}
