import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";

const MOVIES: Movie[] = [
  {
    id: 5,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseDate: new Date(1994, 9, 23),
    rating: 9.3,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  },
  {
    id: 6,
    title: "Fight Club",
    director: "David Fincher",
    releaseDate: new Date(1999, 9, 15),
    rating: 8.8,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
  },
  {
    id: 7,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    releaseDate: new Date(1994, 6, 6),
    rating: 8.8,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
  },
  {
    id: 9,
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseDate: new Date(2014, 10, 7),
    rating: 8.6,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
  },
  {
    id: 10,
    title: "Parasite",
    director: "Bong Joon-ho",
    releaseDate: new Date(2019, 4, 30),
    rating: 8.6,
    posterURL:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
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
