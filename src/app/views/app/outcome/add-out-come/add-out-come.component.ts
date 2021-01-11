import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { OutcomeService } from 'src/app/views/app/outcome/outcome.service';
import { CreateOutCome } from 'src/app/Models/OutCome/create-out-come.model';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { DatePipe } from '@angular/common';
import { Data } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-add-out-come',
  templateUrl: './add-out-come.component.html',
  styleUrls: ['./add-out-come.component.scss']
})
export class AddOutComeComponent implements OnInit, OnChanges {

  constructor(public OutcomeService: OutcomeService,
    private customService: CustomService,
    private notifications: NotificationsService,
    private datePipe: DatePipe
  ) { }
  @Input() currentUserId;
  @Input() editClicked;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  CreateOutCome: CreateOutCome
  ngOnInit(): void {
    this.CreateOutCome = new CreateOutCome()
    this.CreateOutCome.Date=new Date()
    this.Getcoins()
    this.getExportTypes()
  }
  coins: Coin[];
  exportTypes: any[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
  }
 
  addOrEditUser() {
    this.submitted = true;
    this.CreateOutCome.Amount =Number( this.CreateOutCome.Amount);
    this.OutcomeService.Create(this.CreateOutCome).subscribe(res=>{
      this.notifications.create('', 'تم الاضافة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }





}

