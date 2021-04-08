import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as jspdf from 'jspdf';
import { UserLogin } from 'src/app/Models/userlogin.model';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer,) { }
  client: {
    client: any,
    cost: number,
    pay: boolean,
    deliveryCost:number
  }
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  dateOfPrint = new Date()

  ngOnInit(): void {
    this.client = {
      client: null,
      cost: 0,
      pay: true,
      deliveryCost:0
    }
    this.client=JSON.parse(localStorage.getItem('client'))
    console.log(this.client)
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('print'); //The html element to become a pdf
    const pdf = new jspdf("p", "cm", "a4");
    pdf.internal.scaleFactor = 30;
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.client.client.name+'.pdf');
    });
   
    
  }
}
