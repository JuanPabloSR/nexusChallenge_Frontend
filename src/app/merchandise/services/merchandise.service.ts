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

  /**
   * Obtiene la lista de mercancía aplicando filtros.
   *
   * @param filter Opciones de filtrado.
   * @returns Observable con la respuesta de la lista de mercancía.
   */
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

  /**
   * Obtiene información de una mercancía específica por su ID.
   *
   * @param merchandiseId ID de la mercancía.
   * @returns Observable con la información de la mercancía.
   */
  getMerchandiseId(merchandiseId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/merchandise/${merchandiseId}`);
  }

  /**
   * Crea una nueva mercancía.
   *
   * @param merchandiseData Datos de la mercancía a crear.
   * @returns Observable con la respuesta de la creación.
   */
  createMerchandise(merchandiseData: Content): Observable<any> {
    return this.http.post(`${BASE_URL}/merchandise`, merchandiseData);
  }

 /**
   * Actualiza una mercancía existente.
   *
   * @param merchandiseId ID de la mercancía a actualizar.
   * @param merchandise Datos actualizados de la mercancía.
   * @returns Observable con la respuesta de la actualización.
   */
  updateMerchandise(
    merchandiseId: number,
    merchandise: MerchandiseEdit
  ): Observable<any> {
    return this.http.put(`${BASE_URL}/merchandise/${merchandiseId}`, merchandise);
  }

  /**
   * Elimina una mercancía por su ID y el ID del usuario que realiza la acción.
   *
   * @param merchandiseId ID de la mercancía a eliminar.
   * @param userId ID del usuario que realiza la acción.
   * @returns Observable con el estado de la eliminación (código de respuesta HTTP).
   */
  deleteMerchandise(merchandiseId: number, userId: number): Observable<number> {
    const url = `${BASE_URL}/merchandise/${merchandiseId}`;
    const requestBody = { userId: userId };

    return this.http.request('delete', url, { body: requestBody, observe: 'response' }).pipe(
      map(response => response.status)
    );
  }






}
