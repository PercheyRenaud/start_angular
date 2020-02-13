import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/model/movie';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public title = 'cinema-app';
  public defaultYear = 0 ;
  public years: number[] = [];
  public yearsSet:  Set<number> = new Set<number>();
  private yearSubscription: Subscription;

  // public countries: Map<string, any> = new Map<string, any>();

  public movies: Observable<Movie[]>;

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
   this.movies = this.movieService.all();

   this.yearSubscription = this.movieService.years$
      .subscribe((_years) => {
          console.log('years was updated : ' + JSON.stringify(_years));
          this.years = _years;
      });
  }

  // public toggleContry(): void {
  //   this.defaultContry = (this.defaultContry === 'us') ? this.defaultContry = 'it' : this.defaultContry = 'us';
  //   this.movies.forEach((movie: any) => {
  //     movie.show = movie.contry.iso === this.defaultContry;
  //   });
  // }

  public receiveMovies($event): void {
    this.movies = $event;
    console.log(`Received $(JSON.stringify(this.movies)}`);
    // TODO mettre à jour les dates 
    // this.yearsSet.clear();
    
  }
}
