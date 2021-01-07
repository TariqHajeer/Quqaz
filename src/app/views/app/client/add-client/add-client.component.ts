import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit, OnChanges {

  constructor(private customService: CustomService,private clientService:ClientService,
    private notifications: NotificationsService) { }
  client: Client;
  regions: any[] = [];
  tempPhone: any;
  @Input() currentClientId;

  @Input() editClicked;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  ngOnInit(): void {
    this.init();
    this.getRegions();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentClientId && !this.addClicked) {
      this.getClientById();
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
    this.clientService.getClientById(this.currentClientId).subscribe(
      res=>{
        this.client=res;
      }
    )
  }

  addOrEditClient() {
     //this.addFinish.emit('s');
    this.submitted = true;
    if (this.tempPhone)
      this.client.phones.push(this.tempPhone)

    this.clientService.addClient(this.client).subscribe(
      res => {
        if (this.addClicked) {
          this.notifications.create('success', 'تم اضافة عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }
        else if(!this.editClicked) {
          this.notifications.create('success', 'تم تعديل عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }
        this.init();
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