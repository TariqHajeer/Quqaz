import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { TreasuryService } from 'src/app/services/treasury.service';
import { CreateTreasury } from 'src/app/Models/user/create-treasury.model';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
@Component({
  selector: 'app-user-treasury',
  templateUrl: './user-treasury.component.html',
  styleUrls: ['./user-treasury.component.scss'],
})
export class UserTreasuryComponent implements OnInit {
  constructor(
    public UserService: UserService,
    private getroute: ActivatedRoute,
    private treasuryService: TreasuryService,
    private notifications: NotificationsService,
    private router: Router
  ) {}
  id: number;
  User: User = new User();
  GiveOrDiscountPointsDto: boolean;
  noDataFound: boolean;
  displayedColumns: string[] = ['amount', 'type', 'createdOnUtc', 'more'];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  createTreasury: CreateTreasury = new CreateTreasury();
  treasury: Treasury = new Treasury();
  firstAdd: boolean = true;
  paging: Paging = new Paging();
  total: number;
  ngOnInit(): void {
    this.GetUserById();
  }
  GetUserById() {
    this.getroute.params.subscribe((par) => {
      this.id = par['id'] as number;
      this.getTreasury();
    });
    this.UserService.GetById(this.id).subscribe((res) => {
      this.User = res;
    });
  }
  getTreasury() {
    this.treasuryService.getByUserId(this.id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.firstAdd = false;
        this.treasury = res;
        if (this.treasury.history && this.treasury.history.data.length != 0) {
          this.dataSource = new MatTableDataSource(this.treasury.history.data);
          this.total = this.treasury.history.total;
          this.noDataFound = false;
        } else this.noDataFound = true;
      } else {
        this.firstAdd = true;
        this.noDataFound = true;
      }
    });
  }
  getByPaging() {
    this.treasuryService
      .Hisotry(this.treasury.id, this.paging)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
      });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getByPaging();
  }
  addTreasury() {
    if (!this.validation()) return;
    else {
      this.createTreasury.UserId = Number(this.id);
      this.createTreasury.Amount = this.createTreasury.Amount * 1;
      this.treasuryService.Add(this.createTreasury).subscribe((res) => {
        this.notifications.create(
          'success',
          'تم اضافة صندوق بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.getTreasury();
        this.createTreasury = new CreateTreasury();
      });
    }
  }
  GiveMoney() {
    if (!this.validation()) return;
    else {
      this.createTreasury.UserId = this.id;
      this.createTreasury.Amount = this.createTreasury.Amount * 1;
      this.treasuryService
        .GiveMoney(this.createTreasury.UserId, this.createTreasury.Amount)
        .subscribe(
          (res) => {
            this.notifications.create(
              'success',
              'تم اعطاء المبلغ بنجاح',
              NotificationType.Success,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
            this.getTreasury();
            this.createTreasury = new CreateTreasury();
          },
          (err) => {
            this.notifications.create(
              'error',
              'حدث خطأ ما يرجى اعادة المحاولة',
              NotificationType.Error,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
          }
        );
    }
  }
  GetMoney() {
    if (!this.validation()) return;
    else {
      this.createTreasury.UserId = this.id;
      this.createTreasury.Amount = this.createTreasury.Amount * 1;
      this.treasuryService
        .GetMoney(this.createTreasury.UserId, this.createTreasury.Amount)
        .subscribe(
          (res) => {
            this.notifications.create(
              'success',
              'تم اخذ البلغ بنجاح',
              NotificationType.Success,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
            this.getTreasury();
            this.createTreasury = new CreateTreasury();
          },
          (err) => {
            this.notifications.create(
              'error',
              'حدث خطأ ما يرجى اعادة المحاولة',
              NotificationType.Error,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
          }
        );
    }
  }
  ActiveOrDisActive() {
    this.treasury.isActive = !this.treasury.isActive;
    if (this.treasury.isActive) this.Active();
    else this.DisActive();
  }
  DisActive() {
    this.treasuryService.DisActive(this.treasury.id).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم الغاء التفعيل بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
      },
      (err) => {
        this.notifications.create(
          'error',
          'حدث خطأ ما يرجى اعادة المحاولة',
          NotificationType.Error,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.treasury.isActive = !this.treasury.isActive;
      }
    );
  }
  Active() {
    this.treasuryService.Active(this.treasury.id).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم التفعيل بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
      },
      (err) => {
        this.notifications.create(
          'error',
          'حدث خطأ ما يرجى اعادة المحاولة',
          NotificationType.Error,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        this.treasury.isActive = !this.treasury.isActive;
      }
    );
  }
  validation() {
    if (this.createTreasury.Amount) {
      return true;
    } else {
      this.notifications.create(
        'error',
        'يجب ادخال قيمة المبلغ',
        NotificationType.Error,
        { theClass: 'success', timeOut: 6000, showProgressBar: false }
      );
      return false;
    }
  }
  clientPayment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  cashMovment(id) {
    this.router.navigate(['/app/reports/clientprintnumber/', id]);
  }
  receipt(id) {
    this.router.navigate(['/app/reports/printclientreciptandexchange/', id]);
  }
  receiptOfTheOrderStatus(id) {
    this.router.navigate(['/app/reports/printReceiptShipments/', id]);
  }
}
