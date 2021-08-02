import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = 'api/entries';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Entry[]> {
    return this.http
        .get(this.apiPath)
        .pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntries)
        );
  }

  getById(id: number): Observable<Entry> {
    return this.http
      .get(`${this.apiPath}/${id}`)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );
  }

  create(entry: Entry): Observable<Entry> {
    return this.http
      .post(this.apiPath, entry)
      .pipe(
        catchError(this.handleError),
        map(this.jsonDataToEntry)
      );;
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}/${entry.id}`, entry)
    .pipe(
      catchError(this.handleError),
      map(() => entry)
    );;
  }

  delete(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`)
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  // PRIVATE METHODS

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO', error);
    return throwError(error);
  }

}
