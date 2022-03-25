import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { UserService } from 'src/app/services/user.service';
import { CreateIncome } from 'src/app/Models/inCome/create-income.model';
import { IncomeService } from '../income.service';
import { FormGroup } from '@angular/forms';
import { Income } from '../income.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-in-come',
  templateUrl: './add-in-come.component.html',
  styleUrls: ['./add-in-come.component.scss']
})
export class AddInComeComponent implements OnInit, OnChanges {

  constructor(public IncomeService: IncomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    public UserService: UserService,
    private spinner: NgxSpinnerService
  ) { }
  @Input() Income;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  CreateIncome: CreateIncome

  ngOnInit(): void {
    this.CreateIncome = new CreateIncome()
    this.getImportType()
    this.UserService.GetAll();


  }
  ngOnChanges() {
    this.CreateIncome = new CreateIncome()
    this.submitted=false
    if (!this.addClicked&&this.Income!=null&&this.Income!=undefined) {
      this.CreateIncome.Id = this.Income.id
      this.CreateIncome.Amount = this.Income.amount
      this.CreateIncome.Date = this.Income.date
      this.CreateIncome.Note = this.Income.note
      this.CreateIncome.Earining = this.Income.earining
      this.CreateIncome.IncomeTypeId = this.Income.incomeType.id
    }



  }
  
  importTypes: any[] = [];

  getImportType() {
    this.customService.getAll('IncomeType').subscribe(
      res => {
        this.importTypes = res;
      }
    )
  }


  addOrEdit() {
    this.submitted = true;
    this.CreateIncome.Amount = Number(this.CreateIncome.Amount);
    this.CreateIncome.Earining = Number(this.CreateIncome.Earining);
    if (this.addClicked) {
      this.spinner.show()
      this.IncomeService.Create(this.CreateIncome).subscribe(res => {
        this.spinner.hide()
        this.addFinish.emit();
        this.notifications.create('', 'تم الاضافة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      }, err => {
        this.spinner.hide()
      })
    }
    else if (!this.addClicked) {
      this.spinner.show()
      this.IncomeService.Ubdate(this.CreateIncome).subscribe(res => {
        this.spinner.hide()
        this.addFinish.emit();
        this.notifications.create('', 'تم التعديل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      }, err => {
        this.spinner.hide()
      })
    }
  }
}
