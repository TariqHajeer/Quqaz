import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { CreateOutCome } from 'src/app/Models/OutCome/create-out-come.model';
import { CustomService } from 'src/app/services/custom.service';
import { OutcomeService } from 'src/app/views/app/outcome/outcome.service';

@Component({
  selector: 'app-add-more-outcome',
  templateUrl: './add-more-outcome.component.html',
  styleUrls: ['./add-more-outcome.component.scss']
})
export class AddMoreOutcomeComponent implements OnInit {
  submitted = false;
  CreateOutCome: CreateOutCome
  OutComes: CreateOutCome[] = []
  coins: Coin[];
  exportTypes: any[] = [];
  constructor(public OutcomeService: OutcomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
  ) { }
  ngOnInit(): void {
    this.CreateOutCome = new CreateOutCome()
    this.Getcoins()
    this.getExportTypes()
  }
  
  addOutComeInTable() {
    this.OutComes.push(this.CreateOutCome)
    this.CreateOutCome = new CreateOutCome()
  }
  addOrEditUser() {
    this.submitted = true;
  }
  Getcoins() {

    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
    });
  }
  getExportTypes() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.exportTypes = res;

      }
    )
  }
}
