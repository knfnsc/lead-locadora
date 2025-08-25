import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { LoginCredentials } from "../models/login-credentials";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

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
export class LoginComponent {
  form: FormGroup;
  error: string | null = "";

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.authService.isAutheticated()) {
      this.router.navigate([""]);
    }
    this.form = this.fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.form.value;
    const credentials: LoginCredentials = {
      user: formData.user,
      password: formData.password,
    };
    if (this.authService.login(credentials)) {
      this.router.navigate([""]);
    } else {
      this.error = "Invalid credentials";
    }
  }
}
