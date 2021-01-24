import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { UserService } from 'src/app/services/user.service';
import { CreateIncome } from 'src/app/Models/inCome/create-income.model';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-add-in-come',
  templateUrl: './add-in-come.component.html',
  styleUrls: ['./add-in-come.component.scss']
})
export class AddInComeComponent implements OnInit, OnChanges {

  constructor(public IncomeService: IncomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    public UserService: UserService
  ) { }
  @Input() Id;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  CreateIncome: CreateIncome
  ngOnInit(): void {
    this.CreateIncome = new CreateIncome()
    this.Getcoins()
    this.getImportType()
    this.UserService.GetAll();

  }
  ngOnChanges() {
    this.IncomeService.GetById(this.Id).subscribe(res => {
      this.CreateIncome = res as any
    })
  }
  coins: Coin[];
  importTypes: any[] = [];

  Getcoins() {

    this.customService.getAll("Currency").subscribe(res => {
      this.coins = res;
    });
  }
  getImportType() {
    this.customService.getAll('IncomeType').subscribe(
      res => {
        this.importTypes = res;
      }
    )
  }


  addOrEditUser() {
    this.submitted = true;
    this.CreateIncome.Amount = Number(this.CreateIncome.Amount);
    this.CreateIncome.Earining = Number(this.CreateIncome.Earining);
    if (this.addClicked) {
      this.IncomeService.Create(this.CreateIncome).subscribe(res => {
        this.addFinish.emit(this.CreateIncome);
        this.notifications.create('', 'تم الاضافة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      })
    }
    else if (!this.addClicked) {
      this.IncomeService.Ubdate(this.CreateIncome).subscribe(res => {
        this.addFinish.emit(this.CreateIncome);
        this.notifications.create('', 'تم التعديل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      })
    }

  }


}
