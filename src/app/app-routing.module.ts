import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { NewMoviePageComponent } from "./components/new-movie-page.component";
import { MovieDetailsComponent } from "./components/movie-details.component";
import { UserSearchComponent } from "./components/user-search.component";
import { UserDetailsComponent } from "./components/user-details.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "movies/new",
    component: NewMoviePageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "movies/:id",
    component: MovieDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    component: UserSearchComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "users/:id",
    component: UserDetailsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
