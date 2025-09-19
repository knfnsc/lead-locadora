import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, takeUntil } from "rxjs";
import { Movie } from "../models/movie.model";
import { MovieService } from "../services/movie.service";
import { StateService } from "../services/state.service";

@Component({
  selector: "app-home",
  template: `
    <ng-container *ngIf="movies$ | async as movies; else moviesNotFound">
      <ul>
        <li *ngFor="let movie of movies">
          <img
            [routerLink]="['/movies', movie.id]"
            [src]="movie.posterURL"
            [alt]="movie.title"
          />
          <div class="actions">
            <button
              *ngIf="isAdmin"
              [routerLink]="['/movies', movie.id, 'edit']"
            >
              Editar
            </button>
            <button *ngIf="isAdmin" (click)="onDelete(movie)">Deletar</button>
          </div>
        </li>
      </ul>
    </ng-container>
    <ng-template #moviesNotFound>
      <p>Nenhum filme encontrado</p>
    </ng-template>
  `,
  styles: [
    `
      ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, 200px);
        gap: 1rem;

        margin-left: 200px;
      }

      li {
        width: 100%;
        height: 100%;

        & > img {
          aspect-ratio: 27 / 40;
          width: 100%;
          height: calc(100% - 2.5rem);
          border: 1px solid #ccc;
        }
      }

      .actions {
        display: flex;
        justify-content: space-evenly;
      }
    `,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  movies$!: Observable<Movie[]>;
  unsubscribe$!: Subject<void>;
  isAdmin!: boolean;

  constructor(
    private stateService: StateService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.unsubscribe$ = new Subject<void>();
    this.movies$ = this.movieService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$));

    this.isAdmin = !!this.stateService.getUser()?.isAdmin;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onDelete(movie: Movie): void {
    this.movieService
      .deleteMovie(movie.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

    this.movies$ = this.movieService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$));
  }
}
