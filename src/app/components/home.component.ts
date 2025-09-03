import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <ul class="movies" *ngIf="movies$ | async as movies">
      <li class="card" *ngFor="let movie of movies; trackBy: trackByMovieID">
        <img [src]="movie.posterURL" [alt]="movie.title" />
        <h1 [routerLink]="['/movies', movie.id]">{{ movie.title }}</h1>
        <button
          *ngIf="isAdmin$ | async"
          [routerLink]="['/movies', movie.id, 'edit']"
        >
          Editar
        </button>
      </li>
    </ul>
    <div *ngIf="(movies$ | async)?.length === 0">
      <p>Nenhum filme encontrado</p>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  isAdmin$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movies$ = from(this.movieService.getMovies());
    this.isAdmin$ = from(this.authService.isAdmin());
  }

  trackByMovieID(_: number, movie: Movie): number {
    return movie.id;
  }
}
