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
  styles: [
    `
      aside {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 2;

        width: 50px;
        height: 50px;

        border-radius: 7px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;

        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
