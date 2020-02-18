import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private _navigation: Navigation;
  private _idMovie: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this._navigation = this.router.getCurrentNavigation();
    console.log(JSON.stringify(this._navigation.extras));
  }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnInit(): void {
    if (this._navigation.extras && this._navigation.extras.state) {
      const state = this._navigation.extras.state as { movie: number };
      if (state.hasOwnProperty('movie')) {        //methode pour etre certain qu il y a un attribut state dans le movie
        this._idMovie = state.movie;
      }
      console.log(`Extras state : ${this._idMovie}`);
    }


    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ]
    });
  }


  public doLogin(): void {
    //local persitence of user
    if (this.userService.authenticate(this.loginForm.value)) {
      if (this._idMovie === undefined) {
        //road to home
        this.router.navigate(['home']);
        this.snackBar.open(
          "Welcome in Futur'ovies!"
          , ''
          , {
            duration: 2500
          })
      } else {
        this.router.navigate(['../', 'movie', this._idMovie]);
      }
    } else {
      // some snackbar to keek user informed
      this.snackBar.open(
        'Sorry, your identification failed'
        , ''
        , {
          duration: 2500
        }
      )
      // : redraw form with empty values
      this.login.setValue('');
      this.password.setValue('');
    }

  }



}

