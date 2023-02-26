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
        tap(x => this.toastr.success('message', 'Success')),
        tap(x => console.log('df')),
        retry({
          count: 2, 
          delay: 1000,
        }),
        catchError((err: HttpErrorResponse) => {
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
              // client-side error
              this.toastr.error('This is client side error.', `Error ${err.error.message}` );
              errorMessage = `client-side error: Error: ${err.error.message}`;
          } else {
              // server-side error
              this.toastr.error(`This is server side error.`, `Error Code: ${err.status}`);
              errorMessage = `server-side error: Error Status: ${err.status}\n\nMessage: ${err.message}`;
          }
          // console.log('Interceptor errorMesagge: ', errorMessage);
          return throwError(() => {
            // console.log('Interceptor throwError msg')
            return errorMessage
          });
        })

      )
  }
}


// .pipe(
//   retry({
//     count: 3,
//     delay: (_, retryCount) => timer(retryCount * 1000),
//   }),
