import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MovieService } from "../services/movie.service";
import { Router } from "@angular/router";

function notEmptyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value === null ||
    value === undefined ||
    String(value).trim().length === 0
    ? { notEmpty: true }
    : null;
}

@Component({
  selector: "app-new-movie-page",
  template: `
    <app-sidebar></app-sidebar>
    <form [formGroup]="form" (ngSubmit)="onCreate()">
      <label for="title">Título*</label><br />
      <input id="title" type="text" formControlName="title" /><br />

      <label for="director">Diretor*</label><br />
      <input id="director" type="text" formControlName="director" /><br />

      <label for="release-date">Data de lançamento*</label><br />
      <input
        id="release-date"
        type="date"
        formControlName="releaseDate"
      /><br />

      <label for="synopsis">Sinopse:</label><br />
      <textarea id="synopsis" type="text" formControlName="synopsis"></textarea
      ><br />

      <label for="poster-url">Link para o poster:</label><br />
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
      title: ["", [Validators.required, notEmptyValidator]],
      director: ["", [Validators.required, notEmptyValidator]],
      releaseDate: ["", Validators.required],
      synopsis: ["", [Validators.required, notEmptyValidator]],
      posterURL: ["", [Validators.required, notEmptyValidator]],
    });
  }

  async onCreate(): Promise<void> {
    if (!this.form.valid) {
      return;
    }
    const { title, director, releaseDate, synopsis, posterURL } =
      this.form.value;

    await this.movieService.addNewMovie({
      title: title.trim(),
      director: director.trim(),
      releaseDate,
      synopsis: synopsis.trim(),
      posterURL: posterURL.trim(),
    });

    this.router.navigate(["/"]);
  }
}
