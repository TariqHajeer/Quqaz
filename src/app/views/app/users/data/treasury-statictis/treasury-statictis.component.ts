import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreasuryReportResponseDto } from 'src/app/Models/user/treasury.model';
import { TreasuryService } from 'src/app/services/treasury.service';

@Component({
  selector: 'app-treasury-statictis',
  templateUrl: './treasury-statictis.component.html',
  styleUrls: ['./treasury-statictis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreasuryStatictisComponent implements OnChanges {
  @Input() id;
  treasuryReport: TreasuryReportResponseDto = new TreasuryReportResponseDto();
  fromDate;
  toDate;
  public primaryXAxis?: Object;
  public chartData?: Object[] = [];
  public title?: string;
  public primaryYAxis?: Object;
  public palette?: string[] = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];

  constructor(private treasuryService: TreasuryService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnChanges(): void {

    this.primaryXAxis = {
      valueType: 'Category',
      title: ''
    };
    this.primaryYAxis = {
      minimum: 0,
      interval: 10, title: '',
    };
  }
  getReport() {
    if (this.fromDate && this.toDate) {
      let fromDate = new Date(this.fromDate);

      fromDate.setHours(0);
      fromDate.setMinutes(0);
      fromDate.setSeconds(0);

      let toDate = new Date(this.toDate);
      toDate.setHours(0);
      toDate.setMinutes(0);
      toDate.setSeconds(0);
      toDate.setDate(toDate.getDate() + 1);

      let fromDateUtc = this.getTimeUTC(fromDate);
      let toDateUtc = this.getTimeUTC(toDate);
      this.spinner.show();
      this.treasuryService.getTreasuryReport(fromDateUtc, toDateUtc, this.id).subscribe(res => {
        this.spinner.hide();
        if (res) {
          this.treasuryReport = res;
          this.chartData = [
            { state: "يدفع للعمبل", amount: this.treasuryReport.clientPayment?.amount, count: this.treasuryReport.clientPayment?.count },
            { state: "يجلب", amount: this.treasuryReport.getReceipt?.amount, count: this.treasuryReport.getReceipt?.count },
            { state: "يعطي", amount: this.treasuryReport.give?.amount, count: this.treasuryReport.give?.count },
            { state: "الواردات", amount: this.treasuryReport.income?.amount, count: this.treasuryReport.income?.count },
            { state: "الصادرات", amount: this.treasuryReport.outCome?.amount, count: this.treasuryReport.outCome?.count },
            { state: "يدفع", amount: this.treasuryReport.payReceipt?.amount, count: this.treasuryReport.payReceipt?.count },
            { state: "يأخذ", amount: this.treasuryReport.take?.amount, count: this.treasuryReport.take?.count },
          ];
        }
      }, err => {
        this.spinner.hide();
      })
    }
  }
  getTimeUTC(date) {
    return moment.utc(date).format();
  }
}
