import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/core/service/movie.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { take } from 'rxjs/internal/operators/take';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NumberSymbol } from '@angular/common';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  public movie: any;
  public updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  public movieForm: FormGroup;


  ngOnInit(): void {
    //buil the form
    this.movieForm = this.formBuilder.group({
      title: [
        '',
        Validators.required
      ],
      synopsis:
        [
          '',
          Validators.required
        ],
      year:
        [
          '',
          Validators.required
        ],
      genre:
        [
          '',
          Validators.required
        ]
    });
    this.route.data.subscribe((data: { movie: any }) => {
        this.movie = data.movie;
        this.title.setValue(this.movie.title);
        this.synopsis.setValue(this.movie.synopsis);
        this.genre.setValue(this.movie.genre);
        this.year.setValue(this.movie.year);
    })
}

  public get title(): AbstractControl {
  return this.movieForm.controls.title;
}

  public get year(): AbstractControl {
  return this.movieForm.controls.year;
}

  public get genre(): AbstractControl {
  return this.movieForm.controls.genre;
}

  public get synopsis(): AbstractControl {
  return this.movieForm.controls.synopsis;
}



  public get movieTerm(): AbstractControl {
  return this.movieForm.controls.movieTerm;
}

  public updateFilm(): void {
  // console.log('faire mise à jour du film')
  this.movie.synopsis = this.synopsis.value;
  this.movie.title = this.title.value;
  this.movie.year = this.year.value;
  //this.movie.genre = this.genre.value;

  this.movieService.update(this.movie)
    .pipe(
      take(1)
    ).subscribe((response: HttpResponse<any>) => {
      console.log(`update was done with : ${response.status}`);
    });
  // message pour dire mise à jour ok 
  this.snackBar.open(
    "Thanks for your update"
    , ''
    , {
      duration: 2500
    })
}



  public deleteFilm(): void {
  console.log('the movie need to be deleted')
    this.snackBar.open(
    "Are you vraiment sure?"
    , 'I Confirm my bétise !'
    , {
      duration: 3500
    })
    .onAction().pipe(
      take(1)
    ).subscribe(() => {
      this.movieService.delete(this.movie).pipe(take(1)).subscribe(() => {
        this.snackBar.open(
          "Movie deleted!"
          , ''
          , {
            duration: 2500
          });

        this.router.navigate(['home']);
      }
      );
    })
}
}





