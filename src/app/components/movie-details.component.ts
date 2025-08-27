import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../models/movie";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-movie-details",
  template: `
    <main>
      <div *ngIf="movie; else notFound">
        <div class="info">
          <h1 class="title" contenteditable="true">{{ movie.title }}</h1>
          <h2 class="director">{{ movie.director }}</h2>
          <h3>Lançado em {{ movie.releaseDate.toLocaleDateString() }}</h3>
          <p class="synopsis">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
            facilis, porro at consequuntur excepturi saepe accusamus magni,
            quidem fugit et consequatur delectus quisquam ipsam pariatur,
            laboriosam cumque cupiditate laudantium. Quos. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Corporis non possimus enim?
            Dolor deleniti quasi voluptatibus! Consequuntur, aliquam beatae.
            Aspernatur blanditiis quaerat labore ad officiis, error
            reprehenderit asperiores! Veniam, voluptatum? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quaerat laboriosam facilis
            repellat labore beatae fugiat odit. Officiis omnis asperiores alias
            assumenda neque odit ab harum accusamus consectetur nulla. Maxime,
            unde? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur cum sapiente ipsum laboriosam libero praesentium dicta,
            quasi reprehenderit quia ea dolores, soluta laborum excepturi eum
            quam ullam ipsam fugit minima? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Doloremque nemo odit laborum amet
            beatae aliquam debitis omnis, autem quas facere ipsam facilis,
            pariatur nihil tempora voluptas fugit maiores quis temporibus.
          </p>
        </div>
        <img class="poster" [alt]="movie.title" [src]="movie.posterURL" />
      </div>
    </main>
    <ng-template #notFound>
      <h1>Ih, esse aí eu desconheço...</h1>
    </ng-template>
  `,
  styles: [
    `
      main {
        margin: 20px 20px;
      }
    `,
    `
      .poster {
        position: fixed;
        right: 20px;
        top: 20px;

        aspect-ratio: 27 / 40;
        height: calc(100vh - 40px);

        border-radius: 7px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

        img {
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }
      }
    `,
    `
      .info {
        width: 60%;
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
    `
      .synopsis {
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
}
