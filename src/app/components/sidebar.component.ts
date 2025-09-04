import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  template: `
    <aside>
      <nav>
        <button *ngIf="isAdmin$ | async" [routerLink]="['/movies/new']">
          Novo filme
        </button>
        <button *ngIf="isAdmin$ | async" [routerLink]="['/users']">
          Usuários
        </button>
        <button *ngIf="!(isAdmin$ | async)" [routerLink]="['/']">
          Ver novidades
        </button>
        <button class="logout" (click)="onLogout()">Sair</button>
      </nav>
    </aside>
  `,
  styles: [
    `
      aside {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100vh;
        background-color: #f0f0f0;
        padding: 1rem;
      }

      nav {
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        & > button {
          width: 100%;
          padding: 0.5rem;
        }
      }

      .logout {
        margin-top: auto;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  isAdmin$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
