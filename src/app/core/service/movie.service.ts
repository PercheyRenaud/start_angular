import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';


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
    this._years = new Set<number>();
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
    this._years = new Set<number>();
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
    const apiRoot: string = `${environment.apiRoot}movie/${id}`;
    return this.httpClient.get<any>(
      apiRoot,
      {
        observe: 'response'
      }
    )
      .pipe(
        take(1),
        map((response) => {
          return response.body;
        }),
        catchError((error: any) => {
          console.log(`something wrent wrong : ${JSON.stringify(error)}`); 
          return throwError(error.status)
        })
      );
  }

  public update(movie: any): Observable<HttpResponse<any>> {
    const apiRoot: string = `${environment.apiRoot}movie/modify`;
    return this.httpClient.put(
      apiRoot,
      movie,                //=full movie
      {
        observe: 'response'       //ici on observe la réponse de full movie et pas l'objet
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    )
  }

  public delete(movie: Movie): Observable<HttpResponse<any>> {
    const apiRoot: string = `${environment.apiRoot}movie/${movie.idMovie}`;
    return this.httpClient.delete(
      apiRoot,
      {
        observe: 'response'     
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        return response;
      })
    )
  }



}
