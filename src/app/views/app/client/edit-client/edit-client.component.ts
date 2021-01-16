import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';
import { Phone } from 'src/app/Models/phone.model'

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  constructor(private customService: CustomService, private clientService: ClientService,
    private notifications: NotificationsService,
    private getroute: ActivatedRoute,
    private router: Router) { }
  client: Client;
  clients: Client[] = []
  regions: any[] = [];
  phone: Phone
  phones: Phone[] = []
  id
  submitted
  nameIsRepeated: boolean = false;
  usernameIsRepeated: boolean = false;
  confirmpassword: string
  checkPassword: boolean = false
  ngOnInit(): void {
    this.phone = new Phone()
    this.init();
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.getRegions();
    this.getClientById()
  }
  checkName() {
    if (this.clients.filter(c => c.name == this.client.name && c.id != this.client.id).length > 0) {

      this.nameIsRepeated = true
      return;
    }
    else
      this.nameIsRepeated = false
  }
  checkUserName() {

    if (this.clients.filter(c => c.userName == this.client.userName && c.id != this.client.id).length > 0) {

      this.usernameIsRepeated = true
      return;
    } else
      this.usernameIsRepeated = false
  }
  CheckPassword() {
    if (this.client.password != this.confirmpassword) {
      this.checkPassword = true
    }
    else {
      this.checkPassword = false
    }
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
    this.clientService.getClientById(this.id).subscribe(res => {
      this.client = res
      if(this.client.region!=null)
    this.client.regionId= this.client.region.id
      this.phones = this.client.phones
    })
    this.clientService.getClients().subscribe(
      res => {
        this.clients = res

      }
    )
  }

  addOrEditClient() {
    this.clientService.Update(this.client).subscribe(
      res => {
        this.notifications.create('success', 'تم تعديل عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        //this.router.navigate(['/app/client'])

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
    this.phone.objectId = Number(this.id)
    if (this.phone.phone == null || this.phone.phone == undefined) {
      this.notifications.create('', 'الرقم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.phones != [] && this.phones.filter(p => p.phone == this.phone.phone).length > 0) {
      this.notifications.create('', 'الرقم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    this.clientService.addPhone(this.phone).subscribe(res => {
      this.phones.push(this.phone);
      this.phone = new Phone();
      this.notifications.create('success', 'تمت اضافة رقم هاتف بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })

  }
  DeletePhone(item) {
    this.clientService.deletePhone(item.id).subscribe(res => {
      this.phones = this.phones.filter(p => p != item)
      this.notifications.create('success', 'تم حذف رقم هاتف بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }
}
