import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label for="user">Usuário: </label>
      <input type="text" formControlName="user" /><br />

      <label for="password">Senha: </label>
      <input type="password" formControlName="password" /><br />
      <p *ngIf="error">{{ error }}</p>

      <button type="submit" [disabled]="!form.valid">Entrar</button>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    try {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(["/"]);
      }
    } catch (err) {
      this.error = "Erro ao verificar autenticação. Tente novamente.";
      console.error("Auth check error:", err);
    }
  }

  onSubmit(): void {
    this.error = null;
    const { user, password } = this.form.value;

    if (this.authService.login(user.trim(), password)) {
      this.router.navigate(["/"]);
    } else {
      this.error = "Credenciais inválidas";
    }
  }
}
