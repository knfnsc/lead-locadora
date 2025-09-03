import { Injectable } from "@angular/core";
import Dexie, { Table } from "dexie";
import { Movie } from "../models/movie";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class DatabaseService extends Dexie {
  movies!: Table<Movie>;
  users!: Table<User>;

  constructor() {
    super("LeadCadora");

    this.version(1).stores({
      movies: "++id, title, director, releaseDate, synopsis, posterURL",
      users: "++id, [name+password], createdAt, isAdmin, token, favoriteID",
    });

    this.on("ready", () => {
      return this.initializeDefaultData();
    });
  }

  private async initializeDefaultData(): Promise<void> {
    const movieCount = await this.movies.count();
    const userCount = await this.users.count();

    if (movieCount === 0) {
      await this.movies.bulkAdd([
        {
          id: 1,
          title: "Um Sonho de Liberdade",
          director: "Frank Darabont",
          releaseDate: new Date(1994, 9, 23),
          synopsis:
            "Um homem injustamente preso encontra esperança e redenção através da amizade e da perseverança.",
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
          posterURL:
            "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
        },
      ]);
    }

    if (userCount === 0) {
      await this.users.bulkAdd([
        {
          id: 1,
          name: "kauan",
          password: "senha123",
          createdAt: new Date(),
          isAdmin: true,
          token: "1",
        },
        {
          id: 2,
          name: "cara",
          password: "senha123",
          createdAt: new Date(),
          isAdmin: false,
          token: "2",
          favoriteID: 3,
        },
      ]);
    }
  }
}
