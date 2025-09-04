import { Component, OnInit } from "@angular/core";
import { Observable, from } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  template: `
    <div class="sidebar" [class.collapsed]="isCollapsed">
      <button class="toggle" (click)="toggleSidebar()">
        {{ isCollapsed ? ">" : "<" }}
      </button>
      <nav>
        <button *ngIf="isAdmin$ | async" [routerLink]="['/movies/new']">
          <span *ngIf="!isCollapsed">Novo filme</span>
          <span *ngIf="isCollapsed">+</span>
        </button>
        <button *ngIf="isAdmin$ | async" [routerLink]="['/users']">
          <span *ngIf="!isCollapsed">Usuários</span>
          <span *ngIf="isCollapsed">👥</span>
        </button>
        <button *ngIf="!(isAdmin$ | async)" [routerLink]="['/']">
          <span *ngIf="!isCollapsed">Ver novidades</span>
          <span *ngIf="isCollapsed">🏠</span>
        </button>
        <button class="logout" (click)="onLogout()">
          <span *ngIf="!isCollapsed">Sair</span>
          <span *ngIf="isCollapsed">🚪</span>
        </button>
      </nav>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
      }

      .sidebar {
        width: 200px;
        height: 100%;
        background-color: #f0f0f0;
        padding: 1rem;
        transition: width 0.3s ease;
        position: relative;
      }

      .sidebar.collapsed {
        width: 60px;
        padding: 1rem 0.5rem;
      }

      .toggle {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #ddd;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      nav {
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 50px;
      }

      nav > button {
        width: 100%;
        padding: 0.5rem;
        border: none;
        background: #e0e0e0;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
      }

      nav > button:hover {
        background: #d0d0d0;
      }

      .logout {
        margin-top: auto;
      }

      .collapsed nav > button {
        padding: 0.5rem 0.25rem;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  isAdmin$!: Observable<boolean>;
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    console.log("Toggled:", this.isCollapsed); // Debug log
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
