import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { GroupService } from 'src/app/services/group.service';
import { ClientAuthService } from 'src/app/client-pages/service/client-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  userNameModel = '';
  passwordModel = '';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: ClientAuthService
    , private notifications: NotificationsService
    , private router: Router
    , private groupService: GroupService) { }

  ngOnInit() {
    this.myDate = new Date
    this.user = new UserLogin
  }
  user: UserLogin
  myDate: Date
  onSubmit() {
    // if (!this.loginForm.valid || this.buttonDisabled) {
    //   return;
    // }
   
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    if (this.loginForm.value)
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {

          this.user = response as UserLogin
          this.user.expiry = new Date().getTime()
          this.router.navigate(['/home']);
          localStorage.setItem('token', this.user.token)
          console.log(this.user)
          this.authService.setAuthenticatedUser(this.user);


        }, error => {
          this.buttonDisabled = false;
          this.buttonState = '';
          this.notifications.create('Error', ' اسم المستخدم او كلمة المرور غير صحيح', NotificationType.Error, { theClass: 'primary', timeOut: 6000, showProgressBar: false });

        }

      )
  }

}
