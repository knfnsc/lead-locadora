import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="user">Usuário</label>
      <input type="text" id="user" formControlName="user" />
      <label for="password">Senha</label>
      <input type="password" id="password" formControlName="password" />

      <button type="submit" [disabled]="!form.valid">Entrar</button>
      <p class="error-message">{{ errorMessage }}</p>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        margin: auto;
      }

      label {
        margin-bottom: 0.5rem;
        font-weight: bold;
      }

      input {
        padding: 0.5rem;
        margin-bottom: 1rem;

        font-size: 1rem;
      }

      button {
        margin-top: 1.5rem;
        padding: 0.5rem;

        font-size: 1rem;
        font-weight: bold;
      }

      .error-message {
        min-height: 1rem;
        margin-top: 0.5rem;
        color: red;
        font-weight: bold;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ["", [Validators.required, Validators.minLength(1)]],
      password: ["", [Validators.required, Validators.minLength(1)]],
    });
  }

  async ngOnInit(): Promise<void> {
    if (await this.authService.isAuthenticated()) {
      this.router.navigate(["/"]);
    }
  }

  async onSubmit(): Promise<void> {
    const { user, password } = this.form.value;

    if (await this.authService.login(user.trim(), password.trim())) {
      this.router.navigate(["/"]);
    } else {
      this.errorMessage = "Usuário ou senha inválidos";
    }
  }
}
