import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Aphid} from "../models/aphid.model";
const baseUrl = 'http://localhost:8080/api/aphids';
@Injectable({
  providedIn: 'root'
})
export class AphisApiService {
 constructor(private http: HttpClient) { }
  getAll(): Observable<Aphid[]> {
    return this.http.get<Aphid[]>(baseUrl);
  }
  get(id: any): Observable<Aphid> {
    return this.http.get<Aphid>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByName(name: any): Observable<Aphid[]> {
    return this.http.get<Aphid[]>(`${baseUrl}?name=${name}`);
  }
  classify(data: any): Observable<any> {
    return this.http.post(baseUrl.concat('/classify'), data)
  }
}
