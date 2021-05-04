import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateFiter } from 'src/app/Models/paging';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private StatisticsService: StatisticsService,) { }
  filtering: DateFiter

  ngOnInit(): void {
    this.filtering = new DateFiter
    this.get()
  }
  shipmentTotal
  totalIncome
  totalOutCome
  total
  get() {
    if (this.filtering.FromDate != undefined || this.filtering.FromDate != null)
    this.filtering.FromDate = formatDate(this.filtering.FromDate, 'yyyy-MM-dd', 'en-US');
if (this.filtering.ToDate != undefined || this.filtering.ToDate != null)
    this.filtering.ToDate = formatDate(this.filtering.ToDate, 'yyyy-MM-dd', 'en-US');

    this.StatisticsService.GetAggregate(this.filtering).subscribe(res => {
      this.shipmentTotal = res.shipmentTotal
      this.totalIncome = res.totalIncome
      this.totalOutCome = res.totalOutCome
      this.total=  (this.shipmentTotal+ this.totalIncome)- this.totalOutCome
    })
  }
}
