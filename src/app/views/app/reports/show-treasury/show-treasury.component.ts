import { Component, OnInit } from '@angular/core';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { DateService } from 'src/app/services/date.service';
import { TreasuryService } from 'src/app/services/treasury.service';

@Component({
  selector: 'app-show-treasury',
  templateUrl: './show-treasury.component.html',
  styleUrls: ['./show-treasury.component.scss'],
})
export class ShowTreasuryComponent implements OnInit {
  constructor(private treasuryService: TreasuryService,
    public dateService: DateService) {}
  treasuries: Treasury[] = [];
  ngOnInit(): void {
    this.Get();
  }
  Get() {
    this.treasuryService.Get().subscribe((res) => {
      this.treasuries = res;
    });
  }
  ColorClass(i) {
    if (i % 2 == 0) return 'stat-card__icon--primary';
    else if (i % 3 == 0) return 'stat-card__icon--success';
    else if (i % 5 == 0) return 'stat-card__icon--warning';
    else return 'stat-card__icon--danger';
  }
}
