import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { ReceiptAndExchange } from 'src/app/Models/receipt-and-exchange.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { ReciptService } from 'src/app/services/recipt.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-recipt-and-exchange',
  templateUrl: './show-recipt-and-exchange.component.html',
  styleUrls: ['./show-recipt-and-exchange.component.scss'],
})
export class ShowReciptAndExchangeComponent implements OnInit {
  constructor(
    private reciptService: ReciptService,
    private authService: AuthService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
  }
  @Input() client: ReceiptAndExchange;
  userName: UserLogin = this.authService.getUser();
  companyPhone = '07714400880';
  showButton = true;
  dateOfPrint = moment().format();
  agentPhone = environment.companyPhones[1];
  address = environment.Address;
  whatsapp = environment.whatsapp;
  instgram = environment.instgram;
  facebook = environment.Facebook;
  @Input() id;
  receipt() {
    this.client=new ReceiptAndExchange();
    this.reciptService.GetById(this.id).subscribe((res) => {
      this.client = res;
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css =
        '@page { size: A5 landscape;color-adjust: exact;-webkit-print-color-adjust: exact; }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write(
      '<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' +
        divToPrint?.innerHTML +
        '</body></html>'
    );
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
    }, 1000);
  }
}
