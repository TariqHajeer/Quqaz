import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { BranchDetailsService } from 'src/app/services/branch-details.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-receipt-new-orders',
  templateUrl: './receipt-new-orders.component.html',
  styleUrls: ['./receipt-new-orders.component.scss']
})
export class ReceiptNewOrdersComponent implements OnInit, OnChanges {

  constructor(public sanitizer: DomSanitizer,
    private activeBranchDetais: BranchDetailsService

  ) { }
  @Input() order
  orderTypes: string[] = []
  counts: number[] = []
  agentPhone = environment.companyPhones[1]
  address = environment.Address
  whatsapp = environment.whatsapp
  instgram = environment.instgram
  facebook = environment.Facebook
  ngOnInit(): void {
    // this.order.recipientPhones = this.order.recipientPhones.split(',')
    if (this.order.orderItems && this.order.orderItems.length != 0) {
      this.orderTypes = this.order.orderItems.map(o => o.orderTpye.name)
      this.counts = this.order.orderItems.map(o => o.count)
    }
    this.activeBranchDetais.getBranch().pipe(
      tap(data => {
        this.address = data.address;
        this.agentPhone = data.phoneNumber;
      })).subscribe();
  }
  ngOnChanges() {
  }
}
