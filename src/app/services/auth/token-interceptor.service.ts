import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';


// This interceptor service need custom injection
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  // INTERCEPTORS are not dependable classes so we need to use
  // Injector to hold the required dependencies
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this._injector.get(AuthService);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }

}
