import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private StatisticsService: StatisticsService,) { }

  ngOnInit(): void {
    this.get()
  }
  shipmentTotal
  totalIncome
  totalOutCome
  total
  get() {
    this.StatisticsService.GetAggregate().subscribe(res => {
      this.shipmentTotal = res.shipmentTotal
      this.totalIncome = res.totalIncome
      this.totalOutCome = res.totalOutCome
      this.total=  (this.shipmentTotal+ this.totalIncome)- this.totalOutCome
    })
  }
}
