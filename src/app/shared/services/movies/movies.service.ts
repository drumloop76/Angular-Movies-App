import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NowPlayingMoviesData } from '../../models/nowPlayingMovies';
import { PopularMoviesData } from '../../models/popularMovies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  page: number = 1;

  constructor(private http:HttpClient) { }

  getNowPlaying(): Observable<NowPlayingMoviesData> {
    return this.http.get<NowPlayingMoviesData>(
      `${environment.baseUrl}movie/now_playing?api_key=${environment.apiKey}&with_genres=${environment.sciFiGenre}&page=${this.page}&with_original_language=en&language=${environment.language}`
    );
  }

  getPopularMovies(): Observable<PopularMoviesData> {
    return this.http.get<PopularMoviesData>(
      `${environment.baseUrl}movie/popular?api_key=${environment.apiKey}&with_genres=${environment.sciFiGenre}&page=${this.page}&with_original_language=en&language=${environment.language}`
    );
  }
}
