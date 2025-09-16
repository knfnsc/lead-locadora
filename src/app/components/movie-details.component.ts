import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, from, of } from "rxjs";
import { RegularUser } from "../models/user";
import { Movie } from "../models/movie";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-details",
  template: `
    <ng-container *ngIf="movie$ | async as movie; else movieNotFound">
      <img [alt]="movie.title" [src]="movie.posterURL" />
      <input type="text" [(ngModel)]="movie.title" [disabled]="!isEditing" />
      <input type="text" [(ngModel)]="movie.director" [disabled]="!isEditing" />
      <input [(ngModel)]="movie.releaseYear" [disabled]="!isEditing" />
      <textarea [(ngModel)]="movie.synopsis" [disabled]="!isEditing"></textarea>
      <button *ngIf="!(isAdmin$ | async)" (click)="onFavorite(movie)">
        {{ (userFavoriteID$ | async) === movie.id ? "★" : "☆" }}
      </button>
      <button *ngIf="isAdmin$ | async" (click)="onEdit(movie)">
        {{ !isEditing ? "Editar" : "Parar de editar" }}
      </button>
      <button *ngIf="isAdmin$ | async" (click)="onDelete(movie)">
        Deletar
      </button>
    </ng-container>
    <ng-template #movieNotFound>
      <p>Ih, esse filme aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
      }

      img {
        aspect-ratio: 27 / 40;
        width: 300px;
        height: calc(100% - 1.5rem);
        border: 1px solid #ccc;
      }

      input[disabled],
      textarea[disabled] {
        background: transparent;
        border: 2px solid transparent;
        outline: none;
      }

      input {
        font-size: 1.5rem;
        font-weight: bolder;
        text-align: center;

        width: 400px;
      }

      textarea {
        width: 600px;
        height: 200px;

        font-size: 1rem;
        padding: 0.5rem;

        resize: none;
      }
    `,
  ],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie$!: Observable<Movie | null>;
  isAdmin$!: Observable<boolean>;
  userFavoriteID$!: Observable<number | undefined>;
  isEditing = false;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());
    this.userFavoriteID$ = from(this.getUserFavoriteID());

    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const movieID = parseInt(params["id"]);
        if (!isNaN(movieID)) {
          this.movie$ = this.movieService.getMovie(movieID);
        }
      })
    );

    this.subscription.add(
      this.activatedRoute.data.subscribe((data) => {
        this.isEditing = data["editing"] || false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(movie: Movie): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([".."], { relativeTo: this.activatedRoute });
      this.onSave(movie);
    }
  }

  onDelete(movie: Movie): void {
    this.movieService.deleteMovie(movie.id);
    this.router.navigate(["/"]);
  }

  private onSave(movie: Movie): void {
    this.movieService.updateMovie(movie);
  }

  async onFavorite(movie: Movie): Promise<void> {
    const user = (await this.authService.getCurrentUser()) as RegularUser;
    const newFavorite = user.favoriteID === movie.id ? undefined : movie.id;

    await this.userService.updateUser({
      ...user,
      favoriteID: newFavorite,
    });
    this.userFavoriteID$ = of(newFavorite);
  }

  async getUserFavoriteID(): Promise<number | undefined> {
    const user = (await this.authService.getCurrentUser()) as RegularUser;
    return user.favoriteID;
  }
}
