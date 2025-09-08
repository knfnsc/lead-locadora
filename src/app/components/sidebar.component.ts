import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, filter, from, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";

@Component({
  selector: "app-sidebar",
  template: `
    <ng-container *ngIf="!isLoginPage">
      <aside [class.collapsed]="isCollapsed">
        <button class="toggle" (click)="toggleSidebar()">
          {{ isCollapsed ? ">" : "<" }}
        </button>
        <nav>
          <button *ngIf="isAdmin$ | async" [routerLink]="['/movies/new']">
            {{ !isCollapsed ? "Novo filme" : "+" }}
          </button>
          <button *ngIf="isAdmin$ | async" [routerLink]="['/users']">
            {{ !isCollapsed ? "Usuários" : "👥" }}
          </button>
          <button *ngIf="!(isAdmin$ | async)" [routerLink]="['/']">
            {{ !isCollapsed ? "Ver novidades" : "🏠" }}
          </button>
          <button class="logout" (click)="onLogout()">
            {{ !isCollapsed ? "Sair" : "🚪" }}
          </button>
        </nav>
      </aside>
    </ng-container>
  `,
  styles: [
    `
      :host {
        height: 100vh;
        top: 0;
        left: 0;

        z-index: 1000;
        display: block;
        position: fixed;
      }

      aside {
        position: relative;
        width: 200px;
        height: 100%;
        padding: 1rem;

        background-color: #f0f0f0;

        transition: width 0.3s ease;
      }

      aside.collapsed {
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
        margin-top: 50px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      nav > button {
        width: 100%;
        min-height: 40px;
        padding: 0.5rem;

        border: none;
        background: #e0e0e0;
        border-radius: 4px;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;
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
export class SidebarComponent implements OnInit, OnDestroy {
  isAdmin$: Observable<boolean> = of(false);
  isCollapsed = false;
  isLoginPage: boolean = true;

  private subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(
          filter(
            (event): event is NavigationEnd => event instanceof NavigationEnd
          )
        )
        .subscribe(() => {
          this.isLoginPage = this.router.url === "/login";
          this.isAdmin$ = from(this.authService.isAdmin());
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout(): void {
    this.authService.logout();
    this.isAdmin$ = of(false);

    this.router.navigate(["/login"]);
    this.isLoginPage = true;
  }
}
