import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { RegularUser } from "../models/user";
import { Movie } from "../models/movie";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-home",
  template: `
    <ul *ngIf="movies$ | async as movies">
      <li *ngFor="let movie of movies">
        <img
          [routerLink]="['/movies', movie.id]"
          [src]="movie.posterURL"
          [alt]="movie.title"
        />
        <div class="actions">
          <button *ngIf="!(isAdmin$ | async)" (click)="onFavorite(movie)">
            {{ userFavoriteID === movie.id ? "★" : "☆" }}
          </button>
          <button
            *ngIf="isAdmin$ | async"
            [routerLink]="['/movies', movie.id, 'edit']"
          >
            Editar
          </button>
          <button *ngIf="isAdmin$ | async" (click)="onDelete(movie)">
            Deletar
          </button>
        </div>
      </li>
    </ul>
    <ng-container *ngIf="(movies$ | async)?.length === 0">
      <p>Nenhum filme encontrado</p>
    </ng-container>
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
export class HomeComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  isAdmin$!: Observable<boolean>;

  userFavoriteID?: number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movieService: MovieService
  ) {}

  async ngOnInit(): Promise<void> {
    this.movies$ = this.movieService.getMovies();
    this.isAdmin$ = from(this.authService.isAdmin());
    this.userFavoriteID = (
      (await this.authService.getCurrentUser()) as RegularUser
    ).favoriteID;
  }

  async onDelete(movie: Movie): Promise<void> {
    this.movieService.deleteMovie(movie.id);
    this.movies$ = this.movieService.getMovies();
  }

  async onFavorite(movie: Movie): Promise<void> {
    const user = (await this.authService.getCurrentUser()) as RegularUser;
    const newFavorite = user.favoriteID === movie.id ? undefined : movie.id;

    await this.userService.updateUser({
      ...user,
      favoriteID: newFavorite,
    });
    this.userFavoriteID = newFavorite;
  }
}
