import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MovieService {

  public _years: Set<number> = new Set<number>();
  public years$: BehaviorSubject<number[]> =
    new BehaviorSubject<number[]>(Array.from(this._years).sort());

  constructor(
    private httpClient: HttpClient
  ) { }




  public all(): Observable<Movie[]> {
    this._years= new Set<number>();
    const apiRoute = `${environment.apiRoot}movie`;
    return this.httpClient.get<any[]>(
      apiRoute
    )
      .pipe(
        take(1),
        map((response) => {
          return response.map((item) => {
            this._years.add(item.year);
            this.years$.next(Array.from(this._years).sort());
            return new Movie().deserialize(item)
          });
        })
      );
  }

  byTitle(arg0: string) {
    throw new Error("Method not implemented.");
  }

  public getByTitle(search: String): Observable<Movie[]> {
    this._years= new Set<number>();
    const apiRoute = `${environment.apiRoot}movie/byTitleContaining?t=${search}`;
    return this.httpClient.get<any[]>(
      apiRoute
    )
      .pipe(
        take(1),
        map((response) => {
          return response.map((item) => {
          this._years.add(item.year);
          this.years$.next(Array.from(this._years).sort());
          return new Movie().deserialize(item)
          });
        })
      );
  }

  public ById(id: number): Observable<any> {
        const api: string =  `${environment.apiRoot}movie/${id}`;
       return this.httpClient.get<any>(
      api
    )
      .pipe(
        take(1),
        map((response) => {
          return response;
        })
      );
  }

}
