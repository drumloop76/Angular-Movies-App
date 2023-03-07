import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, retry, retryWhen, tap, throwError, timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry({
          count: 2, 
          delay: 1000,
        }),
        catchError((err: HttpErrorResponse) => {
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
              this.toastr.error('This is client side error.', `Error ${err.error.message}` );
              errorMessage = `client-side error: Error: ${err.error.message}`;
          } else {
              this.toastr.error('This is server side error.', `Error Code: ${err.status}`);
              errorMessage = `server-side error: Error Status: ${err.status}\n\nMessage: ${err.message}`;
          }
          return throwError(() => {
            return errorMessage
          });
        })

      )
  }
}
