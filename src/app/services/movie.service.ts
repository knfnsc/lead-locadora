import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";

const MOVIES: Movie[] = [
  {
    id: 0,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseDate: new Date(1972, 3, 14),
    rating: 9.5,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/pt/d/de/Godfather_1972.jpg",
  },
  {
    id: 1,
    title: "One",
    director: "One Unium",
    releaseDate: new Date(2001, 1, 1),
    rating: 1,
    posterURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpics.filmaffinity.com%2Fmetallica_one-956482040-large.jpg&f=1&nofb=1&ipt=ba7ffd274587dfbf7ffc03326d8366f25a3e197be97e14b5d2c9df24cea3520a",
  },
];

@Injectable({
  providedIn: "root",
})
export class MovieService {
  getMovies(): Movie[] {
    return MOVIES;
  }

  getMovie(id: number): Movie | null {
    return MOVIES.find((movie) => movie.id === id) || null;
  }
}
