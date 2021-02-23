import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";


// This interceptor service need custom injection
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = null;
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden
          // response returned from api
          this.openSnackBar('Login Session has expired!', 'OK');
          this._authService.userLogout();
        } else if (err.status === 404) {
          this._router.navigate(["/notFoundResource", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
          error = err.message || err.statusText;
          return throwError(error);
        } else if (err.status === 500 || err.status === 400) {
          this._router.navigate(["/applicationError", err.status], {
            queryParams: {
              "Error-Status": err.status
            }
          });
          error = err.message || err.statusText;
          return throwError(error);
        }
      })
    );
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    })
  }
}
