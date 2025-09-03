import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, from } from "rxjs";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-movie-details",
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="movie$ | async as movie; else movieNotFound">
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
    </div>
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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Set up admin check as Observable
    this.isAdmin$ = from(this.authService.isAdmin());

    // Subscribe to route parameters
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const movieID = parseInt(params["id"]);
        if (!isNaN(movieID)) {
          // Fixed the logic - was checking isNaN but should check !isNaN
          this.movie$ = from(this.movieService.getMovie(movieID));
        }
      })
    );

    // Subscribe to route data for editing mode
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
}
