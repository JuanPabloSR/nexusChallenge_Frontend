import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { FilterOptions } from 'src/app/interfaces/filter-options-interface';
import {  MerchandiseEdit } from 'src/app/interfaces/merchandise-create-interface';
import { Content, MerchandiseReponse } from 'src/app/interfaces/merchandise-response-interface';
import { environment } from 'src/environments/environment.prod';

const BASE_URL = environment.URL_API;

@Injectable({
  providedIn: 'root',
})
export class MerchandiseService {
  constructor(private http: HttpClient) {}

  getMerchandise(filter: FilterOptions): Observable<MerchandiseReponse> {
    const { size, page, keyword, entryDate } = filter;
    let params = new HttpParams()
      .set('size', size)
      .set('page', page)
      .set('searchTerm', keyword);
    if (entryDate) {
      params = params.set('entryDate', entryDate);
    }
    return this.http.get(`${BASE_URL}/merchandise`, { params });
  }

  getMerchandiseId(merchandiseId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/merchandise/${merchandiseId}`);
  }

  createMerchandise(merchandiseData: Content): Observable<any> {
    return this.http.post(`${BASE_URL}/merchandise`, merchandiseData);
  }

  updateMerchandise(
    merchandiseId: number,
    merchandise: MerchandiseEdit
  ): Observable<any> {
    return this.http.put(`${BASE_URL}/merchandise/${merchandiseId}`, merchandise);
  }

  deleteMerchandise(merchandiseId: number, userId: number): Observable<number> {
    const url = `${BASE_URL}/merchandise/${merchandiseId}`;
    const requestBody = { userId: userId };

    return this.http.request('delete', url, { body: requestBody, observe: 'response' }).pipe(
      map(response => response.status)
    );
  }






}
