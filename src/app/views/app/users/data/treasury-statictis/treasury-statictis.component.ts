import { Component, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent, IMouseEventArgs } from '@syncfusion/ej2-angular-charts';
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
  treasuryReport: TreasuryReportResponseDto;
  fromDate;
  toDate;
  public primaryXAxis?: Object;
  public chartData?: Object[] = [];
  public chartDataCount?: Object[] = [];

  public title?: string;
  public primaryYAxis?: Object;
  public palette?: string[] = ["#E94649", "#F6B53F", "#6FAAB0", "#C4C24A"];
  tooltip
  @ViewChild("chart") chart1?: ChartComponent;
  public previousTarget = null;

  constructor(private treasuryService: TreasuryService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnChanges(): void {
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
          this.primaryXAxis = {
            valueType: 'Category',
            title: ''
          };
          this.primaryYAxis = {
            minimum: 0,
            title: '',
          };
          this.tooltip = {
            enable: true,
            template: '<b style="direction: rtl !important;text-align: right;"> ${x} : ${y}</b> ',
          }

          this.chartData = [
            { state: "العميل", amount: this.treasuryReport?.clientPayment?.amount },
            { state: "يجلب", amount: this.treasuryReport?.getReceipt?.amount },
            { state: "يعطي", amount: this.treasuryReport?.give?.amount },
            { state: "الواردات", amount: this.treasuryReport?.income?.amount },
            { state: "الصادرات", amount: this.treasuryReport?.outCome?.amount },
            { state: "يدفع", amount: this.treasuryReport?.payReceipt?.amount },
            { state: "يأخذ", amount: this.treasuryReport?.take?.amount },
          ];
          this.chartDataCount = [
            { state: "العميل", count: this.treasuryReport?.clientPayment?.count },
            { state: "يجلب", count: this.treasuryReport?.getReceipt?.count },
            { state: "يعطي", count: this.treasuryReport?.give?.count },
            { state: "الواردات", count: this.treasuryReport?.income?.count },
            { state: "الصادرات", count: this.treasuryReport?.outCome?.count },
            { state: "يدفع", count: this.treasuryReport?.payReceipt?.count },
            { state: "يأخذ", count: this.treasuryReport?.take?.count },
          ];

        }
      }, err => {
        this.spinner.hide();
      })
    }
  }
  public chartMouseClick(args: IMouseEventArgs): void {
    var flag = false;
    if (((args.target).indexOf('chart_legend_text') > -1) || ((args.target).indexOf('chart_legend_shape') > -1) ||
      (args.target).indexOf('chart_legend_shape_marker_') && !(args.target).indexOf('chart_legend_element')) {
      var ids = ((args.target).indexOf('chart_legend_text') > -1) ?
        (args.target).split('chart_legend_text_')[1] : args.target.split('chart_legend_shape_marker_')[1] || args.target.split('chart_legend_shape_')[1];
      for (var i = 0; i < this.chart1!.series.length; i++) {
        this.chart1!.series[i].visible = false;
      }
      if (ids == this.previousTarget) {
        for (var j = 0; j < this.chart1!.series.length; j++)
          this.chart1!.series[j].visible = true;
        this.chart1!.series[ids].visible = false;
        this.previousTarget = null;
        flag = true;
      }
      if (!flag)
        this.previousTarget = ids as any;
    }
  };
  getTimeUTC(date) {
    return moment.utc(date).format();
  }
}
