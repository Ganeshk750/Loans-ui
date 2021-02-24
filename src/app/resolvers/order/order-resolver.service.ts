import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]> {

  constructor(private _orderService: OrderService) { }

  // For Admin panel
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> {
    return this._orderService.getOrders();
  }
}
