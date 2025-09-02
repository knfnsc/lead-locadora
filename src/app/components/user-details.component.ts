import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../models/user";
import { Movie } from "../models/movie";
import { UserService } from "../services/user.service";
import { MovieService } from "../services/movie.service";

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
    </div>
    <ng-template #userNotFound>
      <p>Ih, esse cara aí eu não conheço...</p>
    </ng-template>
  `,
  styles: [],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: User | null = null;
  favorite: Movie | null = null;
  private subscription = new Subscription();

  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const userId = parseInt(params["id"]);
      if (isNaN(userId)) {
        this.user = null;
        this.favorite = null;
      } else {
        this.user = this.userService.getUser(userId);
        if (this.user && !this.user.isAdmin) {
          this.favorite = this.movieService.getMovie(this.user.favoriteID);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
