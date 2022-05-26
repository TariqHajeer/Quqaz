import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CreateTreasury } from 'src/app/Models/user/create-treasury.model';
import { Treasury } from 'src/app/Models/user/treasury.model';
import { User } from 'src/app/Models/user/user.model';
import { TreasuryService } from 'src/app/services/treasury.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-give-form',
  templateUrl: './get-give-form.component.html',
  styleUrls: ['./get-give-form.component.scss'],
})
export class GetGiveFormComponent implements OnInit {
  constructor(
    private treasuryService: TreasuryService,
    private notifications: NotificationsService,
    public UserService: UserService
  ) {}
  @Input() id: number;
  User: User = new User();
  createTreasury: CreateTreasury = new CreateTreasury();
  firstAdd: boolean = true;
  treasury: Treasury = new Treasury();

  ngOnInit(): void {
    this.GetUserById();
  }
  GetUserById() {
    this.UserService.GetById(this.id).subscribe((res) => {
      this.User = res;
      this.getTreasury();
    });
  }
  getTreasury() {
    this.treasuryService.getByUserId(this.id).subscribe((res) => {
      if (res) {
        this.treasury = res;
        this.firstAdd = false;
      } else {
        this.firstAdd = true;
      }
    });
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
        this.createTreasury = new CreateTreasury();
        this.getTreasury();
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
            this.getTreasury();
            this.notifications.create(
              'success',
              'تم اعطاء المبلغ بنجاح',
              NotificationType.Success,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
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
            this.getTreasury();
            this.notifications.create(
              'success',
              'تم اخذ البلغ بنجاح',
              NotificationType.Success,
              { theClass: 'success', timeOut: 6000, showProgressBar: false }
            );
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
}
