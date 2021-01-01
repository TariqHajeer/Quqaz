import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, BehaviorSubject, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


    constructor(private authenticationService: AuthService,private injector: Injector) { }


      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const currentUser = this.authenticationService.authenticatedUser;
        let token:any=null;
        if(currentUser)
        {
          if(currentUser.token){
            token=currentUser.token;
          }
        }
        return next.handle(this.addToken(req, token)).pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              switch ((<HttpErrorResponse>error).status) {
                case 401:
                    if (req.url.includes("login")){
                        return this.generalErrorHandling(error);
                      }
                      else{
                        return this.logoutUser();
                    }
                default:
                  return this.generalErrorHandling(error);
              }
            } else {
              return this.generalErrorHandling(error);
            }
          }));
      }

      addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
        console.log(token)
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
