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
}
