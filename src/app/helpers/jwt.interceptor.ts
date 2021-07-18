import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { catchError, filter, take, switchMap, finalize, tap } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, BehaviorSubject, throwError } from 'rxjs';
import { UserLogin } from '../Models/userlogin.model';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(private authenticationService: AuthService,
    private injector: Injector, private router: Router,
    private notifications: NotificationsService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (localStorage.getItem('token') != null) {

      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      }

      )

      return next.handle(clonedReq).pipe(
        tap(
          succ => {

          },
          error => {

            if (error instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>error).status) {
                case 401:
                  if (req.url.includes("login")) {
                    return this.generalErrorHandling(error);
                  }
                  else {
                    return this.logoutUser();
                  }
                case 0:
                  this.router.navigate(['/noconnection']);
                case 403:{
                  var user=localStorage.getItem('user')
                  if(user=='client')
                  this.router.navigate(['/home']);
                  else if(user=='employee')
                  this.router.navigate(['/unauthorized']);

                }
                case 400:
                  this.notifications.error('error', 'يجب التأكد من ادخال البيانات', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
                case 409:
                  this.notifications.error('error', error.message, NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
                case 500:
                  this.notifications.error('error', error.message, NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

                default:
                  return this.generalErrorHandling(error);
              }
            } else {
              return this.generalErrorHandling(error);
            }
          }
        ))
    } else {

      return next.handle(req.clone());

    }
  }
  // ExpiryTime() {
  //   var user = this.authenticationService.authenticatedUser
  //   if (user == null || (user.expiry && (new Date().getTime() - user.expiry > 7 * 60 * 60 * 1000))) {
  //     localStorage.removeItem('kokazUser')
  //     localStorage.removeItem('token')
  //     return this.logoutUser();
  //   }
  // }
  addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
    if (token != null) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    } else {
      this.authenticationService.signOut();
      return req.clone();
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      //  return this.logoutUser();
    }
    return this.generalErrorHandling(error);

  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    const authService = this.injector.get(AuthService);
    localStorage.removeItem('token')
    authService.signOut();
    return observableThrowError("");
  }

  generalErrorHandling(error) {
    let errMsg = '';
    // Client Side Error
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    }
    else {  // Server Side Error
      errMsg = `Error Code: ${error.status},  Message: ${error.error.message}`;
    }
    // return an observable
    return throwError(errMsg);
  }
}
