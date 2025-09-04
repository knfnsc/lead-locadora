import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { UserSearchComponent } from "./components/user-search.component";
import { UserDetailsComponent } from "./components/user-details.component";
import { MovieDetailsComponent } from "./components/movie-details.component";
import { SidebarComponent } from "./components/sidebar.component";
import { NewMoviePageComponent } from "./components/new-movie-page.component";
import { PageNotFoundComponent } from "./components/page-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserSearchComponent,
    UserDetailsComponent,
    MovieDetailsComponent,
    SidebarComponent,
    NewMoviePageComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
