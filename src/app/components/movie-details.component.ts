import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, from } from "rxjs";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-movie-details",
  template: `
    <app-sidebar></app-sidebar>
    <ng-container *ngIf="movie$ | async as movie; else movieNotFound">
      <img [alt]="movie.title" [src]="movie.posterURL" />
      <h1>{{ movie.title }}</h1>
      <h2>{{ movie.director }}</h2>
      <h3>{{ movie.releaseDate | date }}</h3>
      <p>{{ movie.synopsis }}</p>
      <button
        *ngIf="isAdmin$ | async"
        [routerLink]="[isEditing ? '..' : 'edit']"
        (click)="onEdit()"
      >
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
  styles: [],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie$!: Observable<Movie | null>;
  isAdmin$!: Observable<boolean>;
  isEditing = false;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());

    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const movieID = parseInt(params["id"]);
        if (!isNaN(movieID)) {
          this.movie$ = from(this.movieService.getMovie(movieID));
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

  onEdit(): void {
    this.isEditing = !this.isEditing;
  }

  async onDelete(movie: Movie): Promise<void> {
    await this.movieService.deleteMovie(movie.id);
    this.router.navigate(["/"]);
  }
}
