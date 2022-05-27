import { Component, OnInit } from '@angular/core';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { TreasuryService } from 'src/app/services/treasury.service';

@Component({
  selector: 'app-show-treasury',
  templateUrl: './show-treasury.component.html',
  styleUrls: ['./show-treasury.component.scss'],
})
export class ShowTreasuryComponent implements OnInit {
  constructor(private treasuryService: TreasuryService) {}
  treasuries: Treasury[] = [];
  ngOnInit(): void {
    this.Get();
  }
  Get() {
    this.treasuryService.Get().subscribe((res) => {
      this.treasuries = res;
    });
  }
  convertDate(date) {
    return new Date(date);
  }
}
