import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  getMoviesGenres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}genre/movie/list?api_key=${environment.apiKey}&language=${environment.language}`)
      .pipe(map((data: any) => {
        // console.log(data.genres)
        return data.genres
      }));
  }

  getTvGenres(): Observable<any> {
    return this.http.get(`${environment.baseUrl}genre/tv/list?api_key=${environment.apiKey}&language=${environment.language}`)
      .pipe(map((data: any) => {
        // console.log(data.genres)
        return data.genres
      }));
  }

}
