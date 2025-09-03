import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private db: DatabaseService) {}

  async addNewMovie(movie: Omit<Movie, "id">): Promise<number> {
    const id = await this.db.movies.add(movie as Movie);
    return id as number;
  }

  async getMovies(): Promise<Movie[]> {
    return await this.db.movies.toArray();
  }

  async getMovie(id: number): Promise<Movie | null> {
    const movie = await this.db.movies.get(id);
    return movie || null;
  }

  async updateMovie(updatedMovie: Movie): Promise<void> {
    const existingMovie = await this.db.movies.get(updatedMovie.id);

    await this.db.movies.put(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    const existingMovie = await this.db.movies.get(id);

    await this.db.movies.delete(id);
  }
}
