import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/core/model/movie';
import { MovieService } from 'src/app/core/service/movie.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  // pour regrouper les controles = ce qu'il y a dans les champs
public searchForm: FormGroup;  

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    ) { }

    public get searchTerm(): AbstractControl {
      return this.searchForm.controls.searchTerm;
    }


  @Output() movies: EventEmitter<Movie[]> = new EventEmitter<Movie[]>();

  ngOnInit(): void {
    this.searchForm= this.formBuilder.group({
      searchTerm: [
        '', //default value for the control
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(75)
        ])
      ]
    });
  }

public reload(): void {
  console.log('something in the field has changed')
  if (this.searchTerm.value.trim().length == 0) {
    console.log('have to reload all list')
    let movies: Movie[] = [];
      this.movieService.all()
        .pipe(
          take(1)
        )
        .subscribe((response: Movie[]) => {
          movies = response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`Emit : ${JSON.stringify(movies)}`)
          this.movies.emit(movies);
        });
    }

    
  }



  public doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      let movies: Movie[] = [];
      this.movieService.getByTitle(this.searchTerm.value.trim())
        .pipe(
          take(1)
        )
        .subscribe((response: Movie[]) => {
          movies = response.map((movie: any) => {
            return new Movie().deserialize(movie);
          });
          console.log(`Emit : ${JSON.stringify(movies)}`)
          this.movies.emit(movies);
        });
    }
  }


}
