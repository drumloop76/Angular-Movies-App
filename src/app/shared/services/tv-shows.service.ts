import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopularTvShowsData } from '../models/popularTvShows';

@Injectable({
  providedIn: 'root'
})

export class TvShowsService {
  page: number = 1;

  constructor(private http: HttpClient) { }

  getPopularSeries(): Observable<PopularTvShowsData> {
    return this.http.get<PopularTvShowsData>(
      `${environment.baseUrl}tv/popular?api_key=${environment.apiKey}&with_genres=${environment.tvSciFiGenre}&page=${this.page}&with_original_language=en&language=${environment.language}`
    );
  }
}
