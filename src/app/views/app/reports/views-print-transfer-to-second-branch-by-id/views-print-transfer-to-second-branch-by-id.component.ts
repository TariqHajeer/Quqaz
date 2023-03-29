import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-views-print-transfer-to-second-branch-by-id',
  templateUrl: './views-print-transfer-to-second-branch-by-id.component.html',
  styleUrls: ['./views-print-transfer-to-second-branch-by-id.component.scss']
})
export class ViewsPrintTransferToSecondBranchByIdComponent implements OnInit {
  orders: any[] = [];
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  dateOfPrint = this.orderservice.orderDetials.createdOnUtc;
  user: string = this.orderservice.orderDetials.printerName;
  printNumber: number = this.orderservice.orderDetials.id;
  fromBranch: string = this.auth.getUser().branche.name;
  toBranch: string = this.orderservice.orderDetials.destinationBranch;
  showSeeMore: boolean;
  paging: Paging = new Paging;
  driverName: string = this.orderservice.orderDetials.driverName;
  id:any;
  constructor(public orderservice: OrderService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
    private auth: AuthService,
    public getroute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as any
    });
    this.orderservice.GetPrintTransferToSecondBranchDetials(this.paging,this.id).subscribe(response => {
      if (this.paging.Page == 1)
        this.orders = response.data;
      else
        response.data.forEach(element => {
          this.orders.push(element);
        });
      if (this.orders.length < response.total)
        this.showSeeMore = true;
      else
        this.showSeeMore = false;
    });
  }
  seeMore() {
    this.paging.Page += this.orderservice.selectOrder.Paging.Page;
    this.getOrders();
  }
  print() {
    this.spinner.show();
    this.orderservice.PrintTransferToSecondBranch(this.printNumber).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
      this.spinner.hide();
      this.notifications.success('success', 'تمت الطباعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide();
    })
  }

}
