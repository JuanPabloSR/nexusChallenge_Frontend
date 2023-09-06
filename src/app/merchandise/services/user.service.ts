import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from 'src/app/interfaces/merchandise-response-interface';
import { UserReponse } from 'src/app/interfaces/user-response-interface';
import { environment } from 'src/environments/environment.prod';

const BASE_URl = environment.URL_API;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserReponse[]> {
    return this.http.get<UserReponse[]>(`${BASE_URl}/user`);
  }

}
