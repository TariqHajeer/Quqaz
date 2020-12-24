import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = '';
  passwordModel = '';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    // if (!this.loginForm.valid || this.buttonDisabled) {
    //   return;
    // }
    console.log(this.loginForm.value);
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.signIn(this.loginForm.value).subscribe(
      response=>{
        console.log(response);
        if(response.result){
          console.log(response.data[0].user)
          this.notifications.create('success', 'تم تسجيل الدخول بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        //  this.authService.setAuthenticatedUser(response.data[0].user);
          this.router.navigate(['/app/HomePage']);
          this.authService.setAuthenticatedUser(response.data[0].user);
          this.authService.setPermission(response.data[0].permissions);
        }
        else{
        this.notifications.create('Error', 'كلمة المرور او البريد الاكتروني خاطئ', NotificationType.Error, { theClass: 'primary', timeOut: 6000, showProgressBar: false });
        this.buttonDisabled = false;
        this.buttonState = '';
        }
      },error=>{
        console.log(error);
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.create('Error', error.message, NotificationType.Error, { theClass: 'primary', timeOut: 6000, showProgressBar: false });

      }

    )
  }
}
