import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-treasury',
  templateUrl: './user-treasury.component.html',
  styleUrls: ['./user-treasury.component.scss'],
})
export class UserTreasuryComponent implements OnInit {
  constructor(
    private getroute: ActivatedRoute
  ) {}
  id: number;
  ngOnInit(): void {
    this.GetUserById();
  }
  GetUserById() {
    this.getroute.params.subscribe((par) => {
      this.id = par['id'] as number;
    });
  }
 
}
