import { Injectable } from "@angular/core";
import { Movie } from "../models/movie.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const API_SERVER_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient) {}

  addNewMovie(movie: Omit<Movie, "id">): Observable<Movie> {
    const response = this.http.post<Movie>(`${API_SERVER_URL}/movies`, movie, {
      headers: { "Access-Control-Allow-Origin": API_SERVER_URL },
      observe: "body",
      responseType: "json",
    });

    return response;
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${API_SERVER_URL}/movies`, {
      headers: { "Access-Control-Allow-Origin": API_SERVER_URL },
      observe: "body",
      responseType: "json",
    });
  }

  getMovie(id: number): Observable<Movie | null> {
    return this.http.get<Movie>(`${API_SERVER_URL}/movies/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": API_SERVER_URL,
      },
      observe: "body",
      responseType: "json",
    });
  }

  updateMovie(updatedMovie: Movie): Observable<Movie> {
    return this.http.put<Movie>(
      `${API_SERVER_URL}/movies/${updatedMovie.id}`,
      updatedMovie,
      {
        headers: {
          "Access-Control-Allow-Origin": API_SERVER_URL,
        },
        observe: "body",
        responseType: "json",
      }
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${API_SERVER_URL}/movies/${id}`, {
      headers: { "Access-Control-Allow-Origin": API_SERVER_URL },
      observe: "body",
      responseType: "json",
    });
  }
}
