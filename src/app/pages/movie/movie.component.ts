import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from 'src/app/core/service/movie.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: any) => {
        console.log(`Params : ${paramMap.params.id}`);
        this.movieService.ById(paramMap.params.id).subscribe((movie: any) => {
          console.log(`And the winner is ${JSON.stringify(movie)}`)
        })
    });
  }

}
