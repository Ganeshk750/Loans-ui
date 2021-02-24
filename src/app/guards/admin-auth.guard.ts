import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._authService.isLoggedIn && this._authService.currentUser && this._authService.currentUser.isAdmin) {
      return true;
    } else {
      this._router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      })
      return false;
    }
  }

}
