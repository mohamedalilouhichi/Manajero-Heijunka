import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProductionPlan} from './productionplan';
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class ProductionPlanService {
  private apiUrl = 'http://localhost:8089/Heijunka/ProductionPlan';

  constructor(private http: HttpClient) {}
  createProductionPlan(productionPlan: ProductionPlan): Observable<ProductionPlan> {
    console.log('Sending production plan to server:', productionPlan); // Debug log
    return this.http.post<ProductionPlan>(this.apiUrl, productionPlan).pipe(
      tap(response => console.log('Server response:', response)),
      catchError(error => {
        console.error('Error creating production plan', error);
        return throwError(error);
      })
    );
  }




  // Add other CRUD operations as needed
}
