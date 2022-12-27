import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "./authentication/authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService : AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(err => {
        console.log(err.status)
        if (err.status == 401) {
          this.authenticationService.logout();
        }
        console.log(err)
        return throwError(err.message);
      }));
  }
}
