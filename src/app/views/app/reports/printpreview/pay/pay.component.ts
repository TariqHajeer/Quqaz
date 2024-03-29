import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer,
    private staticService: StatisticsService,
    private authService:AuthService) { }
  client: {
    client: any,
    cost: number,
    pay: boolean,
    deliveryCost: number
  }
  userName: UserLogin =  this.authService.getUser();
  dateOfPrint = new Date()

  ngOnInit(): void {
    this.get()
    this.client = {
      client: null,
      cost: 0,
      pay: true,
      deliveryCost: 0
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
    const elementToPrint = document.getElementById('print'); //The html element to become a pdf
    const pdf = new jspdf("p", "cm", "a4");
    pdf.internal.scaleFactor = 30;
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });


  }
  ClientBlanace:any[] = []
  get() {
    this.staticService.ClientBalance().subscribe(res => {
      this.ClientBlanace = res
      this.count()
    })
  }
  totalOrder = 0
  totalaccount = 0
  count() {
    this.ClientBlanace.forEach(c => {
      this.totalOrder += c.amount
    })
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact; }',
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
}
