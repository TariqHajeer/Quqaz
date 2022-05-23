import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../income.model';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.scss'],
})
export class ViewByIdComponent implements OnInit {
  constructor(private incomeService: IncomeService,
    private getroute:ActivatedRoute) {}
  income:Income;
  id
  ngOnInit(): void {
    this.GetById()
  }
  GetById() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.incomeService.GetById(this.id).subscribe((res) => {
      this.income = res;
    });
  }
}
