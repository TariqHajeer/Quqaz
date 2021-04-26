import { Component, HostListener, OnInit } from '@angular/core';
import { Account } from '../client.model';
import { ClientService } from '../client.service';
import * as jspdf from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-receipt-and-exchange',
  templateUrl: './receipt-and-exchange.component.html',
  styleUrls: ['./receipt-and-exchange.component.scss']
})
export class ReceiptAndExchangeComponent implements OnInit {

  constructor(private clientService: ClientService,
    public sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.client = {
      client: null,
      cost: 0,
      pay: true,
    }
    this.client=JSON.parse(localStorage.getItem('client'))
    console.log(this.client)
  }
  Account:Account
  client: {
    client: any,
    cost: number,
    pay: boolean
  }
  cost = 0
  aboutas
  Prepare
  recipient
  Manager
  address = "اربيل - برايتي - قرب ماركيت آيه "
  companyPhone = "07714400880"
  showButton=true
  dateOfPrint = new Date()

  printpay() {
    //صرف
    this.Account=new Account()
    this.Account.ClinetId=  this.client.client.id
    this.Account.Amount=-(this.cost)
    this.clientService.Account(this.Account).subscribe(res=>{
      this.client.pay = true
      this.client.cost = this.cost
      this.showButton=false
    })
   

  }
  printcatch() {
    //قبض
    this.Account=new Account()
    this.Account.ClinetId=  this.client.client.id
    this.Account.Amount=this.cost
    this.clientService.Account(this.Account).subscribe(res=>{
      this.client.pay = false
      this.client.cost = this.cost
      this.showButton=false
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
