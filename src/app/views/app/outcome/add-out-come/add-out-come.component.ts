import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { OutcomeService } from 'src/app/views/app/outcome/outcome.service';
import { CreateOutCome } from 'src/app/Models/OutCome/create-out-come.model';
import { DatePipe } from '@angular/common';
import { Data } from '@syncfusion/ej2-angular-grids';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-out-come',
  templateUrl: './add-out-come.component.html',
  styleUrls: ['./add-out-come.component.scss']
})
export class AddOutComeComponent implements OnInit, OnChanges {

  constructor(public OutcomeService: OutcomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    private datePipe: DatePipe,
    public spinner: NgxSpinnerService
  ) { }
  @Input() currentUserId;
  @Input() outcome;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  CreateOutCome: CreateOutCome
  ngOnInit(): void {
    this.CreateOutCome = new CreateOutCome()
    this.getExportTypes()
  }
  exportTypes: any[] = [];
  getExportTypes() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.exportTypes = res;
      }
    )
  }

  ngOnChanges() {
    this.CreateOutCome = new CreateOutCome()
    this.submitted=false
    if (!this.addClicked&&this.outcome!=null&&this.outcome!=undefined) {
      this.CreateOutCome.Id = this.outcome.id
      this.CreateOutCome.Amount = this.outcome.amount
      this.CreateOutCome.Date = this.outcome.date
      this.CreateOutCome.CurrencyId = this.outcome.currency.id
      this.CreateOutCome.Note = this.outcome.note
      this.CreateOutCome.Reason = this.outcome.reason
      this.CreateOutCome.OutComeTypeId = this.outcome.outComeType.id
    }
  }

  addOrEdit() {
    this.submitted = true;
    this.CreateOutCome.Amount = Number(this.CreateOutCome.Amount);
    if (this.addClicked) {
      this.spinner.show()
      this.OutcomeService.Create(this.CreateOutCome).subscribe(res => {
        this.spinner.hide()
        this.CreateOutCome = new CreateOutCome();
        this.submitted =false; 
        this.addFinish.emit();
        this.notifications.create('', 'تم الاضافة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    
    },err=>{
      this.spinner.hide()
    })
    }
    else if (!this.addClicked){
      this.spinner.show()
      this.OutcomeService.Ubdate(this.CreateOutCome).subscribe(res => {
        this.spinner.hide()
        this.CreateOutCome = new CreateOutCome();
        this.submitted =false; 
        this.addFinish.emit();
        this.notifications.create('', 'تم التعديل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    },err=>{
      this.spinner.hide()
    })
    }
    

  }





}

