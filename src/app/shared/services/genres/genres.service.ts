import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  getMoviesGenres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}genre/movie/list?api_key=${environment.apiKey}&language=${environment.language}`)
      .pipe(map((data: any) => {
        return data.genres
      }));
  }

  getTvGenres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}genre/tv/list?api_key=${environment.apiKey}&language=${environment.language}`)
      .pipe(map((data: any) => {
        return data.genres
      }));
  }

  getAllGenres(): Observable<any[]> {
    const movGen = this.getMoviesGenres();
    const tvGen = this.getTvGenres();

    return forkJoin([movGen, tvGen]).pipe(
      map(([arr1, arr2]) => [
        ...arr1,
        ...arr2
      ])
    );
  }

}
