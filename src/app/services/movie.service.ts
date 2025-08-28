import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: "Um Sonho de Liberdade",
      director: "Frank Darabont",
      releaseDate: new Date(1994, 9, 23),
      synopsis:
        "Um homem injustamente preso encontra esperança e redenção através da amizade e da perseverança.",
      rating: 9.3,
      posterURL:
        "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    },
    {
      id: 2,
      title: "Clube da Luta",
      director: "David Fincher",
      releaseDate: new Date(1999, 9, 15),
      synopsis:
        "Um insone frustrado se envolve em um clube secreto de lutas que rapidamente sai do controle.",
      rating: 8.8,
      posterURL:
        "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    },
    {
      id: 3,
      title: "Forrest Gump: O Contador de Histórias",
      director: "Robert Zemeckis",
      releaseDate: new Date(1994, 6, 6),
      synopsis:
        "Um homem simples com um coração puro vive momentos marcantes da história americana enquanto busca seu amor de infância.",
      rating: 8.8,
      posterURL:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    },
    {
      id: 4,
      title: "Interestelar",
      director: "Christopher Nolan",
      releaseDate: new Date(2014, 10, 7),
      synopsis:
        "Exploradores viajam por um buraco de minhoca em busca de um novo lar para a humanidade, enquanto enfrentam os limites do tempo e do espaço.",
      rating: 8.6,
      posterURL:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    },
    {
      id: 5,
      title: "Parasita",
      director: "Bong Joon-ho",
      releaseDate: new Date(2019, 4, 30),
      synopsis:
        "Uma família pobre infiltra-se na vida de uma família rica, revelando as camadas invisíveis de desigualdade social.",
      rating: 8.6,
      posterURL:
        "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    },
  ];

  private get nextID(): number {
    return this.movies.length > 0
      ? Math.max(...this.movies.map((movie) => movie.id)) + 1
      : 1;
  }

  addNewMovie(movie: Omit<Movie, "id">): void {
    this.movies.push({
      ...movie,
      id: this.nextID,
    });
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie | null {
    return this.movies.find((movie) => movie.id === id) || null;
  }
}
