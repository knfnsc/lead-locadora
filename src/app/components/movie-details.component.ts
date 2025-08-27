import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-details",
  template: `
    <div class="movie" *ngIf="movie; else notFound">
      <div class="info">
        <h1 class="title">
          {{ movie.title }}
        </h1>

        <h2 class="director">{{ movie.director }}</h2>
        <h3>Lançado em {{ movie.releaseDate.toLocaleDateString() }}</h3>
        <p class="synopsis">
          {{ movie.synopsis || "Sinopse não encontrada." }}
        </p>
      </div>
      <div class="poster">
        <img [alt]="movie.title" [src]="movie.posterURL" />
        <p>Nota: {{ movie.rating }}</p>
      </div>
    </div>
    <ng-template #notFound>
      <h1>Ih, esse aí eu desconheço...</h1>
    </ng-template>
  `,
  styles: [
    `
      .movie {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    `,
    `
      .poster {
        align-self: flex-start;

        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          aspect-ratio: 27 / 40;
          height: 65vh;

          border-radius: 1%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.65);

          margin-bottom: 5px;
        }
      }
    `,
    `
      .info {
        width: 65%;
        font-size: 2rem;
      }
    `,
    `
      .title {
        margin-bottom: -10px;
        text-transform: uppercase;
        word-wrap: break-word;
        font-size: 3em;
        font-weight: bolder;
      }
    `,
    `
      .director {
        font-style: italic;
        color: grey;

        font-size: 1.5em;

        margin-bottom: 10px;
      }
    `,
    `
      .synopsis {
        font-style: italic;
        margin-top: 10px;
        text-justify: inter-word;
      }
    `,
  ],
})
export class MovieDetailsComponent {
  movie: Movie | null;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    this.movie = this.movieService.getMovie(
      parseInt(this.activatedRoute.snapshot.params["id"])
    );
  }

  onEdit(event: Event | null): void {
    console.log(event?.target);
  }
}
