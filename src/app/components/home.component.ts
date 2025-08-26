import { Component } from "@angular/core";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-home",
  template: `
    <app-sidebar></app-sidebar>
    <main>
      <div
        class="card"
        *ngFor="let movie of movies"
        [routerLink]="['movies/', movie.id]"
      >
        <img
          class="poster"
          [alt]="movie.title"
          [src]="movie?.posterURL"
          width="240"
          height="345"
        />
        <div class="info">
          <h2 class="title">{{ movie.title }}</h2>
          <h3 class="director">{{ movie.director }}</h3>
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      main {
        font-size: 1.25rem;

        margin: 20px;

        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        column-gap: 10px;
      }
    `,
    `
      @media (max-width: 580px) {
        main {
          justify-content: center;
        }
      }
    `,
    `
      .card {
        display: flex;
        flex-direction: column;

        padding: 12px;

        cursor: pointer;

        background-color: rgb(245, 245, 245);
        border-radius: 7px;

        &:hover {
          background-color: rgb(220, 220, 220);

          .title {
            text-decoration: underline;
            text-decoration-thickness: 1px;
          }
        }
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
        margin-top: 10px;
      }
    `,
    `
      .title {
        text-transform: uppercase;
        font-weight: bolder;
      }
    `,
    `
      .director {
        font-style: italic;
        color: grey;
      }
    `,
  ],
})
export class HomeComponent {
  movies: Movie[];

  constructor(private movieService: MovieService) {
    this.movies = this.movieService.getMovies();
  }
}
