import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';

@Injectable({
  providedIn: 'root'})
export class ProductService {
  private apiUrl = 'http://localhost:8089/Heijunka/products';

  constructor(private http: HttpClient) {}
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  updateProducts(products: Product[]): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.apiUrl}`, products);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  updateDailyProductionGoal(payload: { idProduct: string; DailyProductionGoal: number }): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${payload.idProduct}/daily-production-goal`,
      { DailyProductionGoal: payload.DailyProductionGoal });
  }

}
