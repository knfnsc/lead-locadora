import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, from, switchMap, of } from "rxjs";
import { User, RegularUser } from "../models/user";
import { Movie } from "../models/movie";
import { UserService } from "../services/user.service";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-user-details",
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="user$ | async as user; else userNotFound">
      <h1>{{ user.name }}</h1>
      <p>{{ user.isAdmin ? "Administrador" : "Usuário" }}</p>
      <div *ngIf="!user.isAdmin && (favorite$ | async) as favorite">
        <h2>Filme Favorito:</h2>
        <p>{{ favorite.title }}</p>
      </div>
      <button *ngIf="isAdmin$ | async" (click)="onDelete(user)">Excluir</button>
    </div>
    <ng-template #userNotFound>
      <p>Ih, esse cara aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$!: Observable<User | null>;
  favorite$!: Observable<Movie | null>;
  isAdmin$!: Observable<boolean>;
  isEditing = false;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = from(this.authService.isAdmin());

    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const userID = parseInt(params["id"]);
        if (!isNaN(userID)) {
          this.user$ = from(this.userService.getUser(userID));

          this.favorite$ = this.user$.pipe(
            switchMap((user) => {
              if (
                user &&
                !user.isAdmin &&
                this.isRegularUser(user) &&
                user.favoriteID
              ) {
                return from(this.movieService.getMovie(user.favoriteID));
              }
              return of(null);
            })
          );
        }
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

  private isRegularUser(user: User): user is RegularUser {
    return !user.isAdmin;
  }

  async onDelete(user: User): Promise<void> {
    await this.userService.deleteUser(user.id);
  }
}
