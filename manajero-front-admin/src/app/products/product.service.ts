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
  updateDailyProductionGoal(payload: { idProduct: string; dailyProductionGoal: number }): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${payload.idProduct}/daily-production-goal`, {
      dailyProductionGoal: payload.dailyProductionGoal,  // Lowercase "d"
    });
  }
  updateProductTaktTime(idProduct: string, taktTime: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${idProduct}/takt-time`, taktTime);
  }
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }
  archiveProduct(id: string): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}/archive`, {});
  }
  getArchivedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/archived`, {});
  }
  restoreProduct(idProduct: string): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${idProduct}/restore`, {});
  }

getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

}
