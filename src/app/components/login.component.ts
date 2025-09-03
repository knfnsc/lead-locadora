import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="user">Usuário:</label>
      <input type="text" id="user" formControlName="user" />

      <label for="password">Senha:</label>
      <input type="password" id="password" formControlName="password" />

      <button type="submit" [disabled]="!form.valid">Entrar</button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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
    const isAuthenticated = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(["/"]);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const { user, password } = this.form.value;

    await this.authService.login(user.trim(), password.trim());
  }
}
