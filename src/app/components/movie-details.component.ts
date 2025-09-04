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
      <input type="text" [(ngModel)]="movie.title" [disabled]="!isEditing" />
      <input type="text" [(ngModel)]="movie.director" [disabled]="!isEditing" />
      <input
        type="number"
        [(ngModel)]="movie.releaseYear"
        [disabled]="!isEditing"
      />
      <textarea [(ngModel)]="movie.synopsis" [disabled]="!isEditing"></textarea>
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

  onEdit(movie: Movie): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([".."], { relativeTo: this.activatedRoute });
      this.onSave(movie);
    }
  }

  async onDelete(movie: Movie): Promise<void> {
    await this.movieService.deleteMovie(movie.id);
    this.router.navigate(["/"]);
  }

  private async onSave(movie: Movie): Promise<void> {
    await this.movieService.updateMovie(movie);
  }
}
