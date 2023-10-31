import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreasuryService } from 'src/app/services/treasury.service';
@Component({
  selector: 'app-user-treasury',
  templateUrl: './user-treasury.component.html',
  styleUrls: ['./user-treasury.component.scss'],
})
export class UserTreasuryComponent implements OnInit {
  constructor(
    private getroute: ActivatedRoute,
    private treasuryService: TreasuryService
  ) { }
  id: number;
  treasuryId: number;
  ngOnInit(): void {
    this.GetUserById();
  }
  GetUserById() {
    this.getroute.params.subscribe((par) => {
      this.id = par['id'] as number;
    });
    this.treasuryService.getByUserId(this.id).subscribe(res => {
      if (res) {
        this.treasuryId = res.id;
      }
    })
  }

}
