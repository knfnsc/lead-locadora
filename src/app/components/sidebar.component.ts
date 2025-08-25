import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  template: `
    <p>sidebar works!</p>
    <button (click)="onLogout()">Sair</button>
  `,
  styles: [],
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
