import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { catchError, take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MoviesResolver implements Resolve<any> {
    public constructor(
        private movieService: MovieService,
        private router: Router,
    ) { }


    public resolve(
        route: import("@angular/router").ActivatedRouteSnapshot,
        state: import("@angular/router").RouterStateSnapshot
    ): Observable<any> {
        const id: number = parseInt(route.paramMap.get('id'));

        console.log(`Hello resolver: ${id}`);
        return this.movieService.ById(id)
            .pipe(
                take(1),
                map((response) => {
                    return response
                }),
                catchError((error: any, caught: Observable<any>): Observable<any> => {
                    console.log(`resolver failed with : ${JSON.stringify(error)}`);
                    return this._errorHandler(error);
                })
            );
    }


    private _errorHandler(error: number): Observable<any> {
        if (error === 404) {
            this.router.navigate(['home'], {});
        }
        return of(null);
    }




}
