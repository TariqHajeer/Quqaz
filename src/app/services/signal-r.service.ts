import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from '../../environments/environment';
import { AdminNotification } from '../Models/admin-notification.model';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  controler = environment.baseUrl + "NotificationHub"
  AdminNotification: AdminNotification = new AdminNotification();
  data: any[] = [];
  public hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.controler, { accessTokenFactory: () => localStorage.getItem('token') })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  constructor() { }
}
