import { Genre } from './genres.model';

export interface PopularMovies {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface PopularMoviesData {
    page: number;
    results: PopularMovies[];
    total_pages: number;
    total_results: number;
}
