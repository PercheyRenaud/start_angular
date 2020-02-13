import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/core/model/movie';
import { MovieService } from 'src/app/core/service/movie.service';
import { take, tap, debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';



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

  @Output() movies: EventEmitter<Observable<Movie[]>> = new EventEmitter<Observable<Movie[]>>();

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: [
        '', //default value for the control
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(75)
        ])
      ]
    });
    this.searchTerm.valueChanges
    
    .pipe(
      debounceTime(400),
      
      map(() => {
          console.log('value of searchTerm ' + this.searchTerm)
          this.doSearch();
        })
      ).subscribe();
  }

  public doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      this.movies.emit(
        this.movieService.getByTitle(this.searchTerm.value.trim())
      );
      
    }
  }

  public reload(): void {
    console.log('something in the field has changed')
    if (this.searchTerm.value.trim().length == 0) {
      // console.log('have to reload all list')
      this.movies.emit(
        this.movieService.all()
      );
    }
  }


}
