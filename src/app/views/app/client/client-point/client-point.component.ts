import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { GiveOrDiscountPointsDto } from 'src/app/Models/give-or-discount-points-dto';
import { Client } from '../client.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';
@Component({
  selector: 'app-client-point',
  templateUrl: './client-point.component.html',
  styleUrls: ['./client-point.component.scss']
})
export class ClientPointComponent implements OnInit {

  constructor(private clientService: ClientService,
    private notifications: NotificationsService,) { }
  GiveOrDiscountPointsDto: GiveOrDiscountPointsDto = new GiveOrDiscountPointsDto()
  ngOnInit(): void {
    this.getClient()
  }
  clients: Client[] = [];
  getClient() {
    this.clientService.getClients().subscribe(
      res => {
        this.clients = res
      }
    )
  }
  GiveOrDiscountPoints() {
    if(!this.GiveOrDiscountPointsDto.Points||!this.GiveOrDiscountPointsDto.IsGive||!this.GiveOrDiscountPointsDto.ClientId){
      this.notifications.create('Error', 'يجب اختيار جميع الحقول', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.GiveOrDiscountPointsDto.Points = Number(this.GiveOrDiscountPointsDto.Points)
    this.clientService.GiveOrDiscountPoints(this.GiveOrDiscountPointsDto).subscribe(res => {
      if (!this.GiveOrDiscountPointsDto.IsGive)
        this.notifications.create('success', 'تم خصم النقاط بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      else
        this.notifications.create('success', 'تم إعطاء النقاط بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

      this.GiveOrDiscountPointsDto = new GiveOrDiscountPointsDto()
    })
  }
}
