import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private db: DatabaseService) {}

  async addNewMovie(movie: Omit<Movie, "id">): Promise<number> {
    return (await this.db.movies.add(movie as Movie)) as number;
  }

  async getMovies(): Promise<Movie[]> {
    return await this.db.movies.toArray();
  }

  async getMovie(id: number): Promise<Movie | null> {
    return (await this.db.movies.get(id)) || null;
  }

  async updateMovie(updatedMovie: Movie): Promise<void> {
    await this.db.movies.put(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    await this.db.movies.delete(id);
  }
}
