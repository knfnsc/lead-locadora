import { Injectable } from "@angular/core";
import { Movie } from "../models/movie";
import { DatabaseService } from "./database.service";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private db: DatabaseService) {}

  async addNewMovie(movie: Omit<Movie, "id">): Promise<number> {
    if (!movie.title || !movie.director || !movie.releaseDate) {
      throw new Error("Required movie fields are missing");
    }

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
    if (!updatedMovie.id) {
      throw new Error("Movie ID is required for update");
    }

    const existingMovie = await this.db.movies.get(updatedMovie.id);
    if (!existingMovie) {
      throw new Error("Movie not found");
    }

    await this.db.movies.put(updatedMovie);
  }

  async deleteMovie(id: number): Promise<void> {
    const existingMovie = await this.db.movies.get(id);
    if (!existingMovie) {
      throw new Error("Movie not found for deletion");
    }

    await this.db.movies.delete(id);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    return await this.db.movies
      .filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.director.toLowerCase().includes(query.toLowerCase())
      )
      .toArray();
  }
}
