import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/core/model/movie';

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
  // public countries: Map<string, any> = new Map<string, any>();

  public movies: Movie [] = [];

  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const yearsSet: Set<number> = new Set<number>();

    this.movieService.all()
    .pipe(
      take(1)
    )
    .subscribe((response: any[]) => {
      // console.log(`Response : ${JSON.stringify(response)}`);
      this.movies = response;
      this.movies.map((movie: Movie) => {
        yearsSet.add(movie.year);
      });
      this.years = Array.from(yearsSet).sort();
      // console.log(`Response : ${JSON.stringify(this.movies)}`);
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
    this.yearsSet.clear();
    
  }
}
