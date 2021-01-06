import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { UserLogin } from 'src/app/Models/userlogin.model'
import { from } from 'rxjs';
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

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {
  }
  user: UserLogin
  onSubmit() {
    // if (!this.loginForm.valid || this.buttonDisabled) {
    //   return;
    // }
    console.log(this.loginForm.value);
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.signIn(this.loginForm.value).subscribe(
      response => {
        this.user=response as UserLogin
        console.log(response);
        this.notifications.create('success', 'تم تسجيل الدخول بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        //  this.authService.setAuthenticatedUser(response.data[0].user);
        this.router.navigate(['/app/HomePage']);
        this.authService.setAuthenticatedUser( this.user);
        this.authService.setPermission(this.user.privileges);


      }, error => {
        console.log(error);
        this.buttonDisabled = false;
        this.buttonState = '';
        this.notifications.create('Error', error.message, NotificationType.Error, { theClass: 'primary', timeOut: 6000, showProgressBar: false });

      }

    )
  }
}
