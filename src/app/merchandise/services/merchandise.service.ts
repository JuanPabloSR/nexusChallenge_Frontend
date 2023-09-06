import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterOptions } from 'src/app/interfaces/filter-options-interface';
import { MerchandiseReponse } from 'src/app/interfaces/merchandise-response-interface';
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

}
