import { Component, OnInit } from "@angular/core";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <ul class="movies">
      <li class="card" *ngFor="let movie of movies">
        <img [src]="movie.posterURL" />
        <h1 [routerLink]="['/movies', movie.id]">{{ movie.title }}</h1>
        <button [routerLink]="['/movies', movie.id, 'edit']">Editar</button>
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
