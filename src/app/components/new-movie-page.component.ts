import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MovieService } from "../services/movie.service";
import { notEmpty } from "../utils/validators";

@Component({
  selector: "app-new-movie-page",
  template: `
    <form [formGroup]="form" (ngSubmit)="onCreate()">
      <label for="title">Título</label><br />
      <input id="title" type="text" formControlName="title" /><br />

      <label for="director">Diretor</label><br />
      <input id="director" type="text" formControlName="director" /><br />

      <label for="release-year">Ano de lançamento</label><br />
      <input
        id="release-year"
        type="number"
        formControlName="releaseYear"
      /><br />

      <label for="synopsis">Sinopse</label><br />
      <textarea id="synopsis" type="text" formControlName="synopsis"></textarea
      ><br />

      <label for="poster-url">Link para o poster</label><br />
      <input id="poster-url" type="url" formControlName="posterURL" /><br />

      <button type="submit" [disabled]="!form.valid">Criar</button>
    </form>
  `,
  styles: [],
})
export class NewMoviePageComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ["", [Validators.required, notEmpty]],
      director: ["", [Validators.required, notEmpty]],
      releaseYear: ["", [Validators.required, Validators.min(1888)]],
      synopsis: ["", [Validators.required, notEmpty]],
      posterURL: ["", [Validators.required, notEmpty]],
    });
  }

  onCreate(): void {
    if (!this.form.valid) {
      return;
    }
    const { title, director, releaseYear, synopsis, posterURL } =
      this.form.value;

    this.movieService.addNewMovie({
      title: title.trim(),
      director: director.trim(),
      releaseYear: Number(releaseYear),
      synopsis: synopsis.trim(),
      posterURL: posterURL.trim(),
    });

    this.router.navigate(["/"]);
  }
}
