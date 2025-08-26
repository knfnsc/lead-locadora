import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  template: ` <aside>
    <nav>
      <button (click)="onLogout()">Sair</button>
    </nav>
  </aside>`,
  styles: [],
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
