import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { NewMoviePageComponent } from "./components/new-movie-page.component";
import { MovieDetailsComponent } from "./components/movie-details.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: "movies",
    redirectTo: "",
    pathMatch: "full",
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
    path: "movies/:id/edit",
    component: MovieDetailsComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: {
      editing: true,
    },
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
