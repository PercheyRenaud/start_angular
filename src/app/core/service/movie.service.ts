import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Movie } from './../model/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  byTitle(arg0: string) {
    throw new Error("Method not implemented.");
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  
  public all(): Observable<Movie[]> {
    const apiRoute = `${environment.apiRoot}movie`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

  public getByTitle(search: String): Observable<Movie[]> {
    const apiRoute = `${environment.apiRoot}movie/byTitleContaining?t=${search}`;
    return this.httpClient.get<Movie[]>(
      apiRoute
    );
  }

}
