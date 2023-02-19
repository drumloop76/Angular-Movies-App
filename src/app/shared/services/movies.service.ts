import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  page: number = 1;

  constructor(private http:HttpClient) { }

  getNowPlaying(): Observable<any> {
    return this.http.get(`${environment.baseUrl}movie/now_playing?api_key=${environment.apiKey}&with_genres=${environment.sciFiGenre}&page=${this.page}&with_original_language=en&language=${environment.language}`);
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}movie/popular?api_key=${environment.apiKey}&with_genres=${environment.sciFiGenre}&page=${this.page}&language=${environment.language}`);
  }
}
