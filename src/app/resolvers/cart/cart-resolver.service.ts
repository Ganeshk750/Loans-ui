import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {

  constructor(private _cartService: CartService,
    private _authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
    if (this._authService.profile) {
      return this._cartService.getCart(this._authService.profile.cartId);
    }
  }
}
