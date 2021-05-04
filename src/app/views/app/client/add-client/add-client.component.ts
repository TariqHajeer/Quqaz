import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { CustomService } from 'src/app/services/custom.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit, OnChanges {

  constructor(private customService: CustomService, private clientService: ClientService,
    private notifications: NotificationsService) { }
  client: Client;
  clients: Client[] = [];
  regions: any[] = [];
  tempPhone: any;
  @Input() currentClientId;
  @Input() editClicked;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  nameIsRepeated: boolean = false;
  usernameIsRepeated: boolean = false;
  confirmpassword
  checkPassword: boolean = false
  ngOnInit(): void {
    this.client = new Client
    this.getRegions();
    this.getClient()
    this.getCities()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentClientId && !this.addClicked) {
      this.getClientById();

    }
  }
  CheckPassword() {
    if (this.client.password != this.confirmpassword) {
      this.checkPassword = true
    }
    else {
      this.checkPassword = false
    }
  }

  getClient() {
    this.clientService.getClients().subscribe(
      res => {
        this.clients = res
      }
    )
  }
  getClientById() {
    this.clientService.getClients().subscribe(
      res => {
        this.client = res.find(c => c.id == this.currentClientId);

      }
    )
  }
  checkName() {
    if (this.clients.filter(c => c.name == this.client.name).length > 0) {

      this.nameIsRepeated = true
      return;
    }
    else
      this.nameIsRepeated = false
  }
  checkUserName() {

    if (this.clients.filter(c => c.userName == this.client.userName).length > 0) {

      this.usernameIsRepeated = true
      return;
    } else
      this.usernameIsRepeated = false
  }
  addOrEditClient() {
    if (this.RecipientPhoneslengthEdit != null || this.RecipientPhoneslength != null)
      return
    if (this.tempPhone) {
      this.client.phones.push(this.tempPhone)
      this.tempPhone = ''
    }
    if (this.client.phones.length == 0 || !this.client.name ||! this.client.userName
      || !this.client.password || !this.client.firstDate) {
      this.submitted = true;
      return
    }
    else {
      this.submitted = false;
    } 
    this.clientService.addClient(this.client).subscribe(
      res => {
        this.addFinish.emit(this.client);
        if (this.addClicked) {
          this.client = new Client
          this.notifications.create('success', 'تم اضافة عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.tempPhone = '';
          this.submitted = false;
        }

        this.client = new Client
      }
    )
  }
  onTrackBy(index) {
    return index;
  }
  getRegions() {
    this.customService.getAll('Region').subscribe(
      res => {
        this.regions = res;
      }
    )
  }

  addNewPhone() {
    if (this.checkLengthPhoneNumber(this.tempPhone))
      return
    this.client.phones.push(this.tempPhone);
    this.tempPhone = '';
  }
  deletePhone(phone) {
    this.client.phones = this.client.phones.filter(p => p != phone)
  }
  RecipientPhoneslength = null
  checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslength = null
      return false
    }
  }
  RecipientPhoneslengthEdit = null
  checkLengthPhoneNumberForEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslengthEdit = null
      return false
    }
  }
  cities: City[] = [];
  apiName: string = "Country"
  getCities() {
    this.customService.getAll(this.apiName).subscribe(
      res => {
        this.cities = res;
      }
    )
  }
}
