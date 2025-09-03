import { Component, OnInit } from "@angular/core";
import { Observable, from, BehaviorSubject, EMPTY } from "rxjs";
import { catchError, finalize, startWith } from "rxjs/operators";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <ul class="movies" *ngIf="movies$ | async as movies">
      <li class="card" *ngFor="let movie of movies; trackBy: trackByMovieId">
        <img [src]="movie.posterURL" [alt]="movie.title" />
        <h1 [routerLink]="['/movies', movie.id]">{{ movie.title }}</h1>
        <button [routerLink]="['/movies', movie.id, 'edit']">Editar</button>
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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = from(this.movieService.getMovies());
  }

  trackByMovieId(_: number, movie: Movie): number {
    return movie.id;
  }
}
