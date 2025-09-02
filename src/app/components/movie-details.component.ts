import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-movie-details",
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="movie; else movieNotFound">
      <img [alt]="movie.title" [src]="movie.posterURL" />
      <h1>
        {{ movie.title }}
      </h1>
      <h2>{{ movie.director }}</h2>
      <h3>{{ movie.releaseDate }}</h3>
      <p>{{ movie.synopsis }}</p>
      <button
        *ngIf="isAdmin"
        [routerLink]="[isEditing ? '..' : 'edit']"
        (click)="onEdit()"
      >
        {{ !isEditing ? "Editar" : "Parar de editar" }}
      </button>
    </div>
    <ng-template #movieNotFound>
      <p>Ih, esse filme aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [],
})
export class MovieDetailsComponent implements OnDestroy {
  movie: Movie | null = null;
  private subscription = new Subscription();

  isAdmin = this.authService.isAdmin();
  isEditing = false;

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const movieID = parseInt(params["id"]);
        this.movie = isNaN(movieID)
          ? null
          : this.movieService.getMovie(movieID);
      })
    );

    this.subscription.add(
      this.activatedRoute.data.subscribe((data) => {
        this.isEditing = data["editing"];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit(): void {
    this.isEditing = !this.isEditing;
  }
}
