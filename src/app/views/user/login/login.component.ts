import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserLogin } from 'src/app/Models/userlogin.model'
import { GroupService } from 'src/app/services/group.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  userNameModel = '';
  passwordModel = '';
  buttonDisabled = false;
  buttonState = '';
  constructor(private authService: AuthService
    , private notifications: NotificationsService
    , private router: Router) { }

  ngOnInit() {
    this.myDate = new Date
    this.user = new UserLogin
    if (localStorage.getItem('kokazUser')) {
      this.user = JSON.parse(localStorage.getItem('kokazUser'))
      if (this.user.policy == "Employee")
        this.router.navigate(['/app/HomePage']);
      else
        this.router.navigate(['/app/agent']);
    }

  }
  user: UserLogin
  myDate: Date
  onSubmit() {
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    if (this.loginForm.value)
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('user', 'employee')
          this.user = response as UserLogin
          this.user.expiry = new Date().getTime()
          if (this.user.policy == "Employee")
            this.router.navigate(['/app/HomePage']);
          else
            this.router.navigate(['/app/agent']);
          localStorage.setItem('token', this.user.token)
          this.authService.setAuthenticatedUser(this.user);
        }, error => {
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notifications.create('Error', ' اسم المستخدم او كلمة المرور غير صحيح', NotificationType.Error, { theClass: 'primary', timeOut: 6000, showProgressBar: false });
        }
      )
  }
}
