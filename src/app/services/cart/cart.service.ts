import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from '../../shared/error-handler';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) { }
  private _cartUrl = `http://localhost:3000/cart`;
  private _cartItemUrl = `http://localhost:3000/cart_items`;
  private errorHandler: ErrorHandler = new ErrorHandler();


  getCart(id: number): Observable<Cart> {
    try {
      const urlById = `${this._cartUrl}/${id}`;
      return this._http.get<Cart>(urlById);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCartItem(id: number): Observable<CartItem> {
    try {
      const urlById = `${this._cartItemUrl}/${id}`;
      return this._http.get<CartItem>(urlById);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  clearCartProducts(cartItemId: number): Observable<CartItem> {
    try {
      const clearUrl = `${this._cartItemUrl}/${cartItemId}/products/clear-products`;
      return this._http.delete<CartItem>(clearUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  placeOrder(cartItemId: number, productId: number,
    createOrderDto: any): Observable<void> {
    try {
      const orderUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/placeorder`;
      return this._http.post<void>(orderUrl, createOrderDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  removeFromCart(cartItemId: number, productId: number): Observable<CartItem> {
    try {
      const removeUrl = `${this._cartItemUrl}/${cartItemId}/products/${productId}/remove-from-cart`;
      return this._http.delete<CartItem>(removeUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  checkout(cartItemId: number, createOrderDto: any): Observable<void> {
    try {
      const checkoutUrl = `${this._cartItemUrl}/${cartItemId}/checkout`;
      return this._http.post<void>(checkoutUrl, createOrderDto);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
