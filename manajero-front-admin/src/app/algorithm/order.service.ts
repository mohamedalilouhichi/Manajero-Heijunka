import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from './Orders';

@Injectable({
  providedIn: 'root'})
export class OrderService {
  private apiUrl = 'http://localhost:8089/Heijunka/order';

  constructor(private http: HttpClient) {}

  createOrders(productId: string, orders: Orders[]): Observable<Orders[]> {
    return this.http.post<Orders[]>(`${this.apiUrl}/${productId}`, orders);
  }


  updateOrder(id: string, order: Orders): Observable<Orders> {
    return this.http.put<Orders>(`${this.apiUrl}/${id}`, order);
  }

  getOrderById(id: string): Observable<Orders> {
    return this.http.get<Orders>(`${this.apiUrl}/${id}`);
  }
  getOrdersByProductId(productId: string): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.apiUrl}/product/${productId}`);
  }

  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
