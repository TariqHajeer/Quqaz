import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ClientBlanace } from 'src/app/Models/client-blanace.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer,
    private staticService: StatisticsService) { }
  client: {
    client: any,
    cost: number,
    pay: boolean,
    deliveryCost: number
  }
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
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
      console.log(res)
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
}
