import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home.component";
import { LoginComponent } from "./components/login.component";
import { UserSeatchComponent } from "./components/user-seatch.component";
import { UserDetailsComponent } from "./components/user-details.component";
import { MovieDetailsComponent } from "./components/movie-details.component";
import { SidebarComponent } from "./components/sidebar.component";
import { NewMovieComponent } from './components/new-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserSeatchComponent,
    UserDetailsComponent,
    MovieDetailsComponent,
    SidebarComponent,
    NewMovieComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
