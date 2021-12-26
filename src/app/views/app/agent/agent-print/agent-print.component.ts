import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-agent-print',
  templateUrl: './agent-print.component.html',
  styleUrls: ['./agent-print.component.scss']
})
export class AgentPrintComponent implements OnInit {

  constructor(
    public sanitizer: DomSanitizer,
    private location: Location
  ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي','التاريخ', 'المحافظة ','المنطقة', 'الهاتف', 'اسم العميل','ملاحظات العميل', 'مـلاحظـــــات']
  orders: any[] = []
  count = 0
  agent
  orderplaced
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address = environment.Address
  companyPhone = environment.companyPhones[0]+" - "+ environment.companyPhones[1]
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.orders = JSON.parse(localStorage.getItem('printordersagent'))
    if(!this.orders){
      this.location.back()
    }
    else{
      this.orders=this.orders.sort((a,b)=>a.code-b.code)
      this.agent = JSON.parse(localStorage.getItem('printagent'))
      this.sumCost()
    }
      }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
      })
    return this.count
  }
  showPrintbtn = true
  showPrintnumber = true
 
  dateWithIds 

 
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 80) {
      this.convetToPDF()
      return false
    }
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('contentToConvert'); //The html element to become a pdf
    const pdf = new jspdf('l', 'in', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });


  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact;} @media print {table{margin-bottom:10%;}}',
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
