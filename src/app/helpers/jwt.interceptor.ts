import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { tap } from 'rxjs/operators';
import {
  throwError as observableThrowError,
  Observable,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private injector: Injector,
    private router: Router,
    private notifications: NotificationsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (localStorage.getItem('token') != null) {
      const clonedReq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          .set(
            'branche',
            JSON.stringify(this.authenticationService.getUser().branche.id)
          ),
      });

      return next.handle(clonedReq).pipe(
        tap(
          (succ) => {},
          (error) => {
            if (error instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>error).status) {
                case 401:
                  if (req.url.includes('login')) {
                    return this.generalErrorHandling(error);
                  } else {
                    return this.logoutUser(error);
                  }
                case 0: {
                  this.router.navigate(['/noconnection']);
                  break;
                }
                case 403: {
                  this.router.navigate(['/unauthorized']);
                  break;
                }
                case 404: {
                  this.router.navigate(['/error']);
                  break;
                }
                case 400:
                  this.notifications.error(
                    'error',
                    'يجب التأكد من ادخال البيانات',
                    NotificationType.Success,
                    {
                      theClass: 'success',
                      timeOut: 6000,
                      showProgressBar: false,
                    }
                  );
                  break;
                case 409:
                  this.notifications.error(
                    'error',
                    error.message,
                    NotificationType.Success,
                    {
                      theClass: 'success',
                      timeOut: 6000,
                      showProgressBar: false,
                    }
                  );
                  break;
                case 500:
                  this.notifications.error(
                    'error',
                    error.message,
                    NotificationType.Success,
                    {
                      theClass: 'success',
                      timeOut: 6000,
                      showProgressBar: false,
                    }
                  );
                  break;
                default:
                  return this.generalErrorHandling(error);
              }
            } else {
              return this.generalErrorHandling(error);
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
  logoutUser(error) {
    // Route to the login page (implementation up to you)
    const authService = this.injector.get(AuthService);
    localStorage.removeItem('token');
    authService.signOut();
    return observableThrowError(error);
  }

  generalErrorHandling(error) {
    let errMsg = '';
    // Client Side Error
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.message}`;
    } else {
      // Server Side Error
      errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
    }
    // return an observable
    return throwError(errMsg);
  }
}
