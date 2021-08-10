import { Component, HostListener, OnInit } from '@angular/core';
import { Account, Client } from '../client.model';
import { ClientService } from '../client.service';
import * as jspdf from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { ReceiptAndExchange } from 'src/app/Models/receipt-and-exchange.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-receipt-and-exchange',
  templateUrl: './receipt-and-exchange.component.html',
  styleUrls: ['./receipt-and-exchange.component.scss']
})
export class ReceiptAndExchangeComponent implements OnInit {

  constructor(private clientService: ClientService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService) { }
    userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin

  ngOnInit(): void {
    this.client = new ReceiptAndExchange()
    this.client.client=new Client
    this.client.Amount=0
    this.client.client=JSON.parse(localStorage.getItem('client'))
  }
  Account:Account
  client: ReceiptAndExchange 
  address = "اربيل - برايتي - قرب ماركيت آيه "
  companyPhone = "07714400880"
  showButton=true
  dateOfPrint = new Date()

  printpay() {
    //صرف
    this.client.date=this.dateOfPrint
    this.client.ClinetId=  this.client.client.id
    this.client.IsPay = true
    this.client.Amount =-1*( this.client.Amount)
    if(!this.client.Manager||!this.client.About||!this.client.Amount){
      return
    }
    else
    this.spinner.show()
    this.clientService.Account(this.client).subscribe(res=>{
      this.spinner.hide()
      this.client.id=res as number
      this.showButton=false
    }, err => {
      this.spinner.hide()
    })
   

  }
  printcatch() {
    //قبض
    this.client.ClinetId=  this.client.client.id
    this.client.IsPay = false
    this.client.Amount =1*( this.client.Amount)
    this.client.date=this.dateOfPrint
    if(!this.client.Manager||!this.client.About||!this.client.Amount){
      return
    }
    else
    this.spinner.show()
    this.clientService.Account(this.client).subscribe(res=>{
      this.spinner.hide()
      this.client.id=res as number
      this.showButton=false
    }, err => {
      this.spinner.hide()
    })
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 80) {
      this.convetToPDF()
      return false
    }
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('contentToConvert'); //The html element to become a pdf
    const pdf = new jspdf('p', 'mm', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save( this.dateOfPrint+'.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A5 landscape;color-adjust: exact;-webkit-print-color-adjust: exact; }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 10);
  }
  // validation():boolean{
  //   if(!this.client.Manager||!this.client.About||!this.client.Amount)return true
  //   else return false
  // }
}
