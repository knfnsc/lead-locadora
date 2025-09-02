export interface Movie {
  readonly id: number;
  title: string;
  director: string;
  releaseDate: Date;
  synopsis?: string;
  posterURL?: string;
}
