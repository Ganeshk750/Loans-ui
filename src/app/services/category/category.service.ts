import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from '../../shared/error-handler';
import { Observable } from 'rxjs';
import { Product } from "../../models/product";
import { Category } from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = `http://localhost:3000/categories`;

  constructor(private _http: HttpClient) { }


  private errorHandler: ErrorHandler = new ErrorHandler();

  getCategories(): Observable<Category[]> {
    try {
      return this._http.get<Category[]>(this.categoryUrl);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryById(id: number): Observable<Category> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${id}`;
      return this._http.get<Category>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  createCategory(createCategoryDto: any): Observable<Category> {
    try {
      return this._http.post<Category>(this.categoryUrl, createCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  updateCategory(categoryId: number, updateCategoryDto): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}`;
      return this._http.put<void>(urlById, updateCategoryDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }
  updateProduct(
    categoryId: number,
    productId: number,
    updateProductDto: any
  ): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this._http.put<void>(urlById, updateProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  deleteCategory(categoryId: number): Observable<any> {
    try {
      const urlOfCategory = `${this.categoryUrl}/${categoryId}`;
      return this._http.delete<void>(urlOfCategory);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getCategoryProducts(id: number): Observable<Product[]> {
    try {
      return this._http.get<Product[]>(`${this.categoryUrl}/products`);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  deleteProduct(categoryId: number, productId: number) {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products/${productId}`;
      return this._http.delete<void>(urlById);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

  addProduct(categoryId: number, createProductDto: any): Observable<void> {
    try {
      const urlById = `${this.categoryUrl}/${categoryId}/products`;
      return this._http.post<void>(urlById, createProductDto);
    } catch (err) {
      this.errorHandler.handleError(err);
    }
  }

}
