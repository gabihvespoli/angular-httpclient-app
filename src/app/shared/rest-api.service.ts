import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee';

import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.apiURL}/employees`)
      .pipe(tap(console.log))
      .pipe(retry(1), catchError(this.handleError));
  }

  getEmployee(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/employees/' + id)
      .pipe(tap(console.log))
      .pipe(retry(1), catchError(this.handleError));
  }

  createEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        `${this.apiURL}/employees`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(tap(console.log));
  }

  updateEmployee(id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        `${this.apiURL}/employees/${id}`,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(tap(console.log))
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteEmployee(id: any) {
    return this.http
      .delete<Employee>(`${this.apiURL}/employees/${id}`, this.httpOptions)
      .pipe(tap(console.log))
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client
      errorMessage = error.error.message;
    } else {
      // Server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
