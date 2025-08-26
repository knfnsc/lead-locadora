import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-details",
  template: `
    <main>
      <p *ngIf="!movie">Esse filme não existe!</p>
      <div class="info">
        <h1 class="title">{{ movie?.title }}</h1>
        <h2 class="director">{{ movie?.director }}</h2>
        <p>Lançado em {{ movie?.releaseDate?.toLocaleDateString() }}</p>
      </div>
      <img
        class="poster"
        [alt]="movie?.title"
        [src]="movie?.posterURL"
        width="35%"
        height="100%"
      />
    </main>
  `,
  styles: [
    `
      main {
        margin: 20px;

        display: flex;
        justify-content: space-between;
      }
    `,
    `
      .poster {
        border-radius: 7px;
        border: 2px solid rgb(200, 200, 200);
      }
    `,
    `
      .info {
        font-size: 2rem;
      }
    `,
    `
      .title {
        font-size: 4rem;
        font-weight: bolder;
      }
    `,
    `
      .director {
        font-size: 3rem;
        font-style: italic;
        color: grey;
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
}
