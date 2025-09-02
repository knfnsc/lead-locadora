import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-details",
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="movie; else movieNotFound">
      <h1>{{ movie.title }}</h1>
    </div>
    <ng-template #movieNotFound>
      <p>Ih, esse filme aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [],
})
export class MovieDetailsComponent implements OnDestroy {
  movie: Movie | null = null;
  private subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const movieId = parseInt(params["id"]);
      this.movie = isNaN(movieId) ? null : this.movieService.getMovie(movieId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
