import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-sidebar",
  template: `
    <aside>
      <nav>
        <button *ngIf="isAdmin$ | async" [routerLink]="['/movies/new']">
          Novo filme
        </button>
        <a *ngIf="isAdmin$ | async" [routerLink]="['/users']">Usuários</a>
        <a *ngIf="!(isAdmin$ | async)" [routerLink]="['/']">Ver novidades</a>
        <button (click)="onLogout()">Sair</button>
      </nav>
    </aside>
  `,
  styles: [],
})
export class SidebarComponent implements OnInit {
  isAdmin$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());
  }

  onLogout(): void {
    this.authService.logout();
  }
}
