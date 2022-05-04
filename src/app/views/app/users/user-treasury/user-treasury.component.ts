import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { TreasuryService } from 'src/app/services/treasury.service';
import { CreateTreasury } from 'src/app/Models/user/create-treasury.model';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-treasury',
  templateUrl: './user-treasury.component.html',
  styleUrls: ['./user-treasury.component.scss']
})
export class UserTreasuryComponent implements OnInit {
  constructor(public UserService: UserService,
    private getroute: ActivatedRoute,
    private treasuryService: TreasuryService,
    private notifications: NotificationsService,) { }
  id: any;
  User: User = new User();
  GiveOrDiscountPointsDto: boolean;
  noDataFound: boolean;
  displayedColumns: string[] = ['amount', 'type', 'createdOnUtc'];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  createTreasury: CreateTreasury = new CreateTreasury();
  treasury: Treasury = new Treasury();
  firstAdd: boolean = true;
  ngOnInit(): void {
    this.GetUserById();
  }
  GetUserById() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string;
      this.getTreasury()
    });
    this.UserService.GetById(this.id).subscribe(res => {
      this.User = res;
    });
  }
  getTreasury() {
    this.treasuryService.getByUserId(this.id).subscribe(res => {
      if (res) {
        this.firstAdd = false;
        this.treasury = res
        console.log(this.treasury)
        if (this.treasury.history && this.treasury.history.data.length != 0) {
          this.dataSource = new MatTableDataSource(this.treasury.history.data)
          this.noDataFound = false;
        } else
          this.noDataFound = true;
      }
      else {
        this.firstAdd = true;
        this.noDataFound = true;
      }
      console.log(res)
    });
  }
  addTreasury() {
    if (!this.validation()) return
    else {
      this.createTreasury.UserId = this.id;
      this.createTreasury.Amount = this.createTreasury.Amount * 1;
      this.treasuryService.Add(this.createTreasury).subscribe(res => {
        this.notifications.create('success', 'تم اضافة صندوق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.getTreasury();
      });
    }
  }
  GiveMoney() {
    if (!this.validation()) return
    else {
      this.createTreasury.UserId = this.id;
      this.createTreasury.Amount = this.createTreasury.Amount * 1;
      this.treasuryService.GiveMoney(this.createTreasury.UserId, this.createTreasury.Amount).subscribe(res => {
        this.notifications.create('success', 'تم اعطاء المبلغ بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.getTreasury();
      });
    }
  }
  GetMoney() {
    if (!this.validation()) return
    else {
      this.createTreasury.UserId = this.id;
      this.createTreasury.Amount = this.createTreasury.Amount * -1;
      this.treasuryService.GetMoney(this.createTreasury.UserId, this.createTreasury.Amount).subscribe(res => {
        this.notifications.create('success', 'تم اخذ البلغ بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.getTreasury();
      });
    }
  }
  validation() {
    if (this.createTreasury.Amount) {
      return true
    }
    else {
      this.notifications.create('success', 'يجب ادخال قيمة المبلغ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return false
    }
  }
}
