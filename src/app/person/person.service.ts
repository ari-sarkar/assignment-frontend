import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { apiConfig } from 'src/api-url.config';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  API_END_POINT: string;
  
  constructor(private httpClient: HttpClient,) { 
    this.API_END_POINT = environment.API_END_POINT;
  }

  getAllPersons() {
    return this.httpClient.get(`${this.API_END_POINT}${apiConfig.person}`)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }

  getPerson(id:string){
    return this.httpClient.get(`${this.API_END_POINT}${apiConfig.person}/${id}`)
    .pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(err.error);
      })
    );
  }

  addPerson(data: any) {
    return this.httpClient.post(`${this.API_END_POINT}${apiConfig.person}`, data)
      .pipe(
        map((res: any) => res),
        catchError((err: any) => {
          return throwError(err.error);
        })
      );
  }

  editPerson(id:string,data:string){
    return this.httpClient.put(`${this.API_END_POINT}${apiConfig.person}/${id}`,data)
    .pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(err.error);
      })
    );
  }

  deletePerson(id:string){
    return this.httpClient.delete(`${this.API_END_POINT}${apiConfig.person}/${id}`)
    .pipe(
      map((res: any) => res),
      catchError((err: any) => {
        return throwError(err.error);
      })
    );
  }

}
