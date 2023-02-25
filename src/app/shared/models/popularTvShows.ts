import { Genre } from './genres.model';

export interface PopularTvShows {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: Genre[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface PopularTvShowsData {
  page: number;
  results: PopularTvShows[];
  total_pages: number;
  total_results: number;
}
