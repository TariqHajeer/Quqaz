import { Component, HostListener, OnInit } from '@angular/core';
import { Account, Client } from '../client.model';
import { ClientService } from '../client.service';
import * as jspdf from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { CreateReceiptAndExchange } from 'src/app/Models/receipt-and-exchange.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/auth.service';
import { tap } from 'rxjs/operators';
import { BranchDetailsService } from 'src/app/services/branch-details.service';

@Component({
  selector: 'app-receipt-and-exchange',
  templateUrl: './receipt-and-exchange.component.html',
  styleUrls: ['./receipt-and-exchange.component.scss']
})
export class CreateReceiptAndExchangeComponent implements OnInit {

  constructor(private clientService: ClientService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private activeBranchDetais: BranchDetailsService
  ) { }
  userName: any = this.authService.getUser();

  ngOnInit(): void {
    this.client = new CreateReceiptAndExchange()
    this.client.client = new Client
    this.client.Amount = 0
    this.client.client = JSON.parse(localStorage.getItem('client'))
    this.activeBranchDetais.getBranch().pipe(
      tap(data => {
        this.address = data.address;
        this.companyPhone = data.phoneNumber;
      })).subscribe();
  }
  Account: Account
  client: CreateReceiptAndExchange
  // address = "اربيل - برايتي - قرب ماركيت آيه "
  companyPhone = "07714400880"
  showButton = true
  dateOfPrint = moment().format()
  agentPhone = environment.companyPhones[1]
  address = environment.Address
  whatsapp = environment.whatsapp
  instgram = environment.instgram
  facebook = environment.Facebook
  printpay() {
    //صرف
    if (!this.client.Manager || !this.client.About || !this.client.Amount) {
      return;
    }
    else {
      this.client.date = this.dateOfPrint;
      this.client.ClinetId = this.client.client.id;
      this.client.IsPay = true;
      this.client.Amount = -1 * Number(this.client.Amount);
      this.spinner.show();
      this.clientService.Account(this.client).subscribe(res => {
        this.spinner.hide();
        this.client.id = res as number;
        this.showButton = false;
      }, err => {
        this.spinner.hide();
      })
    }
  }
  printcatch() {
    //قبض
    if (!this.client.Manager || !this.client.About || !this.client.Amount) {
      return;
    }
    else {
      this.client.ClinetId = this.client.client.id;
      this.client.IsPay = false;
      this.client.Amount = 1 * Number(this.client.Amount);
      this.client.date = this.dateOfPrint;
      this.spinner.show();
      this.clientService.Account(this.client).subscribe(res => {
        this.spinner.hide();
        this.client.id = res as number;
        this.showButton = false;
      }, err => {
        this.spinner.hide();
      })
    }
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
      pdf.save(this.dateOfPrint + '.pdf');
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

    }, 1000);
  }
  // validation():boolean{
  //   if(!this.client.Manager||!this.client.About||!this.client.Amount)return true
  //   else return false
  // }
}
