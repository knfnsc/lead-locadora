import { Component, OnInit } from "@angular/core";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <ul class="movies">
      <li
        class="card"
        *ngFor="let movie of movies"
        [routerLink]="['movies', movie.id]"
      >
        <img [src]="movie.posterURL" />
        <h1>{{ movie.title }}</h1>
      </li>
    </ul>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
  }
}
