import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeijunkaBox} from './HeijunkaBox';

@Injectable({
  providedIn: 'root',
})
export class HeijunkaboxService {
  private apiUrl = 'http://localhost:8089/Heijunka/heijunkabox';
  constructor(private http: HttpClient) {}


  addHeijunkaBox(heijunkaBox: HeijunkaBox): Observable<HeijunkaBox> {
    return this.http.post<HeijunkaBox>(this.apiUrl, heijunkaBox);
  }
  getLatestHeijunkaBox(): Observable<HeijunkaBox> {
    return this.http.get<HeijunkaBox>(`${this.apiUrl}/latest`);
  }
getHeijunkaBoxes(): Observable<HeijunkaBox[]> {
    return this.http.get<HeijunkaBox[]>(this.apiUrl);
  }
  getHeijunkaBox(idBox: string): Observable<HeijunkaBox> {
    return this.http.get<HeijunkaBox>(`${this.apiUrl}/${idBox}`);
  }
  updateHeijunkaBox(heijunkaBox: HeijunkaBox): Observable<HeijunkaBox> {
    return this.http.put<HeijunkaBox>(`${this.apiUrl}/${heijunkaBox.idBox}`, heijunkaBox);
  }
  deleteHeijunkaBox(idBox: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idBox}`);
  }
}
