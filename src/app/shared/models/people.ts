import { Genre } from './genres.model';

export interface PopularPeople {
    adult: boolean;
    gender: number;
    id: number;
    known_for: KnownFor[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

export interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Genre[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface PopularPeopleData {
    page: number;
    results: PopularPeople[];
    total_pages: number;
    total_results: number;
}
