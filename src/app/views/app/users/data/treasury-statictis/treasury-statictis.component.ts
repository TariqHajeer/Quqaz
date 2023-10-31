import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
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
  fromDate: Date = new Date();
  toDate: Date = new Date();
  public primaryXAxis?: Object;
  public chartData?: Object[];
  public title?: string;
  public primaryYAxis?: Object;
  constructor(private treasuryService: TreasuryService,
  ) { }

  ngOnChanges(): void {
    this.chartData = [
      { country: "USA", gold: 50 },
      { country: "China", gold: 40 },
      { country: "Japan", gold: 70 },
      { country: "Australia", gold: 60 },
      { country: "France", gold: 50 },
      { country: "Germany", gold: 40 },
      { country: "Italy", gold: 40 },
      { country: "Sweden", gold: 30, silver: 25 }
    ];
    this.primaryXAxis = {
      valueType: 'Category',
      title: 'Countries'
    };
    this.primaryYAxis = {
      minimum: 0, maximum: 80,
      interval: 20, title: 'Medals'
    };
    // this.title = 'Olympic Medals';
    console.log(this.fromDate);

    if (this.id)
      this.getReport();
  }
  getReport() {
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

    this.treasuryService.getTreasuryReport(fromDateUtc, toDateUtc, this.id).subscribe(res => {
      if (res)
        this.treasuryReport = res;
    })
  }
  getTimeUTC(date) {
    return moment.utc(date).format();
  }
}
