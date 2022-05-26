import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Outcome } from '../outcome.model';
import { OutcomeService } from '../outcome.service';

@Component({
  selector: 'app-view-by-id',
  templateUrl: './view-by-id.component.html',
  styleUrls: ['./view-by-id.component.scss']
})
export class ViewByIdComponent implements OnInit {

  constructor(private outcomeService: OutcomeService,
    private getroute:ActivatedRoute) {}
  outcome:Outcome;
  id
  ngOnInit(): void {
    this.GetById()
  }
  GetById() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.outcomeService.GetById(this.id).subscribe((res) => {
      this.outcome = res;
    });
  }

}
