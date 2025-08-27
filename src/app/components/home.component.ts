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
        <img [alt]="movie.title" [src]="movie.posterURL" />
        <button class="favourite">⭐</button>
      </div>
    </main>
  `,
  styles: [
    `
      main {
        margin: 20px 100px;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
      }
    `,
    `
      .card {
        position: relative;

        aspect-ratio: 27 / 40;
        height: calc((100vh - 60px) / 2);

        border-radius: 7px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

        img {
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }

        &:hover {
          cursor: pointer;

          outline: 2px dotted lightgrey;
        }
      }
    `,
    `
      .favourite {
        position: absolute;
        bottom: 6px;
        right: 6px;
        z-index: 2;
        background: none;
        border: none;
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
