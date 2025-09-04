import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, from, switchMap, of } from "rxjs";
import { User } from "../models/user";
import { Movie } from "../models/movie";
import { UserService } from "../services/user.service";
import { MovieService } from "../services/movie.service";

@Component({
  selector: "app-user-details",
  template: `
    <app-sidebar></app-sidebar>
    <ng-container *ngIf="user$ | async as user; else userNotFound">
      <input
        class="user-name"
        [(ngModel)]="user.name"
        required
        [disabled]="!isEditing"
      />
      <p class="role">{{ user.isAdmin ? "Administrador" : "Usuário" }}</p>
      <ng-container *ngIf="!user.isAdmin && (favorite$ | async) as favorite">
        <div class="favorite">
          <h2>Filme Favorito:</h2>
          <p>{{ favorite.title }}</p>
        </div>
      </ng-container>
      <div class="actions">
        <button *ngIf="!user.isAdmin" (click)="onEdit(user)">
          {{ !isEditing ? "Editar" : "Parar de editar" }}
        </button>
        <button *ngIf="!user.isAdmin" (click)="onDelete(user)">Excluir</button>
      </div>
    </ng-container>
    <ng-template #userNotFound>
      <p>Ih, esse cara aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [
    `
      :host {
        height: 100%;

        display: block;
        margin-left: 200px;
        padding: 1rem;

        text-align: center;
      }
    `,
    `
      .user-name {
        font-size: 2rem;
        font-weight: bolder;
        text-align: center;
        border: none;
        background: transparent;
        outline: none;
        width: 400px;
      }

      .role {
        text-align: center;
        font-style: italic;
        margin-bottom: 2rem;
      }

      .favorite {
        margin-bottom: 2rem;
      }

      .favorite > h2 {
        margin: 0;
        margin-bottom: 0.5rem;
      }

      .favorite > p {
        font-size: 1.5rem;
        font-weight: bolder;
        margin: 0;
      }

      .actions {
        display: flex;
        gap: 1rem;
        justify-content: space-evenly;
      }

      .actions > button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
      }
    `,
  ],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$!: Observable<User | null>;
  favorite$!: Observable<Movie | null>;

  isEditing: boolean = false;

  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const userID = parseInt(params["id"]);
        if (isNaN(userID)) {
          return;
        }

        this.user$ = from(this.userService.getUser(userID));

        this.favorite$ = this.user$.pipe(
          switchMap((user) => {
            if (user && !user.isAdmin && user.favoriteID) {
              return from(this.movieService.getMovie(user.favoriteID));
            }
            return of(null);
          })
        );
      })
    );

    this.subscription.add(
      this.activatedRoute.data.subscribe((data) => {
        this.isEditing = data["editing"] || false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onEdit(user: User): Promise<void> {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([".."], { relativeTo: this.activatedRoute });
      if (user.name.trim()) {
        user.name = user.name.trim();
        await this.onSave(user);
      }
    }
  }

  async onDelete(user: User): Promise<void> {
    await this.userService.deleteUser(user.id);
    this.router.navigate(["/users"]);
  }

  private async onSave(user: User): Promise<void> {
    await this.userService.updateUser(user);
  }
}
