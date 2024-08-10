import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HeijunkaBox} from './HeijunkaBox';
import {map} from 'rxjs/operators';

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
    return this.http.get<HeijunkaBox[]>(this.apiUrl)
      .pipe(
        map(boxes => boxes.filter(box => !box.archived)));
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
  archiveHeijunkaBox(idBox: string): Observable<HeijunkaBox> {
    return this.http.patch<HeijunkaBox>(`${this.apiUrl}/${idBox}/archive`, {});
  }
  getArchivedHeijunkaBoxes(): Observable<HeijunkaBox[]> {
    return this.http.get<HeijunkaBox[]>(`${this.apiUrl}/archived`);
  }
  restoreHeijunkaBox(idBox: string): Observable<HeijunkaBox> {
    return this.http.patch<HeijunkaBox>(`${this.apiUrl}/${idBox}/restore`, {});
  }
}
