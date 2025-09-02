import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../models/user";
import { Movie } from "../models/movie";
import { UserService } from "../services/user.service";
import { MovieService } from "../services/movie.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-user-details",
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="user; else userNotFound">
      <h1>{{ user.name }}</h1>
      <p>{{ user.isAdmin ? "Administrador" : "Usuário" }}</p>
      <div *ngIf="!user.isAdmin && favorite">
        <h2>Filme Favorito:</h2>
        <p>{{ favorite.title }}</p>
      </div>
      <button *ngIf="isAdmin" (click)="onDelete()">Excluir</button>
    </div>
    <ng-template #userNotFound>
      <p>Ih, esse cara aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [],
})
export class UserDetailsComponent implements OnDestroy {
  user: User | null = null;
  favorite: Movie | null = null;
  private subscription = new Subscription();

  isAdmin: boolean = this.authService.isAdmin();
  isEditing = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription.add(
      this.activatedRoute.params.subscribe((params) => {
        const userID = parseInt(params["id"]);
        if (!isNaN(userID)) {
          this.user = this.userService.getUser(userID);
          if (this.user && !this.user.isAdmin && this.user.favoriteID) {
            this.favorite = this.movieService.getMovie(this.user.favoriteID);
          }
        }
      })
    );

    this.subscription.add(
      this.activatedRoute.data.subscribe((data) => {
        this.isEditing = data["editing"];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id);
    }
  }
}
