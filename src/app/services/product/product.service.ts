import { Injectable } from '@angular/core';
import { Product } from "../../models/product";
import { ErrorHandler } from '../../shared/error-handler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `http://localhost:3000/products`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router) {
  }

  getProducts(): Observable<Product[]> {
    try {
      return this._http.get<Product[]>(this.url);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getProductById(id: number): Observable<Product> {
    try {
      const urlById = `${this.url}/${id}`;
      return this._http.get<Product>(urlById);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  insertToCart(productId: number, cartItemId: number, cartQuantity: number): Observable<Product> {
    try {
      const params = new HttpParams().set('quantity', cartQuantity.toString());
      const urlById = `${this.url}/${productId}/addtocart/${cartItemId}`;
      return this._http.post<Product>(urlById, null, {
        params
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  updateProductCartQuantity(productId: number, cartQuantity: number): Observable<void> {
    try {
      const params = new HttpParams().set('cartQuantity', cartQuantity.toString());
      const urlById = `${this.url}/${productId}/update-quantity`;
      return this._http.patch<void>(urlById, null, {
        params
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  viewProductDetails(product: Product) {
    this._router.navigate(['/products', product.id], {
      queryParams: {
        Name: product.name
      }
    })
  }

  pushToCart(productId: number, quantity: number) {
    if (this._authService.cartItem) {
      this.insertToCart(productId, this._authService.cartItem.id, quantity)
        .subscribe(res => {
          this._router.navigate(['/cart'],
            {
              queryParams: {
                Updated: true
              }
            })
        })
    }
  }
}
