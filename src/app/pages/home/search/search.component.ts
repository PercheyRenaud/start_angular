import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/model/movie';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  public searchTerm: string;


  ngOnInit(): void {
  }

  public doSearch(): void {
    if (this.searchTerm.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.getByTitle(this.searchTerm.trim())
        .pipe(
          take(1)
        )
        .subscribe((response: Movie[]) => {
          movies = response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`Emit : ${JSON.stringify(movies)}`)
        });
    }
  }


}
