import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  controler = environment.baseUrl + "NotificationHub"
  // countdata:number
  data: any[]=[];
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
  public addTransferChartDataListener = () => {
    this.hubConnection.on('RM', (data) => {
      data = JSON.parse(data);
      data.forEach(element => {
        this.data.push(element)
      });
    });
  }
  constructor() { }
}
