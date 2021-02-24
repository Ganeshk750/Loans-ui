import { Injectable } from '@angular/core';
import { ErrorHandler } from '../../shared/error-handler';
import { Invoice } from '../../models/invoice';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoiceUrl = `http://localhost:3000/invoices`;
  private errorHandler: ErrorHandler = new ErrorHandler();

  constructor(private _http: HttpClient) {
  }

  getUserInvoice(id: number): Observable<Invoice> {
    try {
      return this._http.get<Invoice>(`${this.invoiceUrl}/${id}`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
