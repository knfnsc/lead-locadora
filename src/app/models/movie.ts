export interface Movie {
  readonly id: number;
  title: string;
  director: string;
  releaseDate: Date;
  rating: number;
  posterURL?: string;
}
