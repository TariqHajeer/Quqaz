import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Paging } from 'src/app/Models/paging';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { UserService } from 'src/app/services/user.service';
import { TreasuryService } from 'src/app/services/treasury.service';
import { CashMovment } from 'src/app/Models/user/cash-movment.model';
import { DateService } from 'src/app/services/date.service';
import { ReceiptAndExchange } from 'src/app/Models/receipt-and-exchange.model';
import { ReciptService } from 'src/app/services/recipt.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-treasury-table',
  templateUrl: './treasury-table.component.html',
  styleUrls: ['./treasury-table.component.scss'],
})
export class TreasuryTableComponent implements OnInit {
  constructor(
    public UserService: UserService,
    private treasuryService: TreasuryService,
    private notifications: NotificationsService,
    private router: Router,
    public dateService: DateService,
    private reciptService: ReciptService,
    public sanitizer: DomSanitizer,
  ) {}
  noDataFound: boolean;
  displayedColumns: string[] = ['amount', 'type', 'createdOnUtc', 'more'];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  treasury: Treasury;
  paging: Paging = new Paging();
  total: number;
  @Input() id: number;
  @Input() isActive: boolean;
  cashMovmentid:CashMovment=new CashMovment();

  ngOnInit(): void {
    this.getTreasury()
  }
  getTreasury() {
    this.treasury = new Treasury();
    this.treasuryService.getByUserId(this.id).subscribe((res) => {
      if (res) {
        this.treasury = res;
        this.dataSource = new MatTableDataSource(this.treasury.history.data);
        this.total=this.treasury.history.total
        console.log(res)
      }
    });
  }
  getByPaging() {
    this.treasuryService
      .Hisotry(this.treasury.id, this.paging)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
      });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getByPaging();
  }

  client: ReceiptAndExchange = new ReceiptAndExchange();
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin;
  companyPhone = "07714400880";
  showButton = true;
  dateOfPrint = moment().format();
  agentPhone = environment.companyPhones[1];
  address = environment.Address;
  whatsapp = environment.whatsapp;
  instgram = environment.instgram;
  facebook = environment.Facebook;
  clientPayment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  cashMovment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  receipt(id) {
    this.reciptService.GetById(id).subscribe(res => {
      this.client = res;
    })
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
  receiptOfTheOrderStatus(id) {
    this.router.navigate(['/app/reports/printReceiptShipments/', id]);
  }
  income(id) {
    this.router.navigate(['/app/income/view/', id]);
  }
  outcome(id) {
    this.router.navigate(['/app/outcome/view/', id]);
  }
  ActiveOrDisActive() {
    this.treasury.isActive = !this.treasury.isActive;
    if (this.treasury.isActive) this.Active();
    else this.DisActive();
  }
  DisActive() {
    this.treasuryService.DisActive(this.treasury.id).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم الغاء التفعيل بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
      },
      (err) => {
        this.notifications.create(
          'error',
          'حدث خطأ ما يرجى اعادة المحاولة',
          NotificationType.Error,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.treasury.isActive = !this.treasury.isActive;
      }
    );
  }
  Active() {
    this.treasuryService.Active(this.treasury.id).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم التفعيل بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
      },
      (err) => {
        this.notifications.create(
          'error',
          'حدث خطأ ما يرجى اعادة المحاولة',
          NotificationType.Error,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.treasury.isActive = !this.treasury.isActive;
      }
    );
  }
  CashMovmentId(id){
    this.treasuryService.CashMovmentId(id).subscribe(res=>{
      this.cashMovmentid=res
    })
  }

}
