import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopularPeopleData } from '../models/people';

@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  constructor(private http: HttpClient) { }

  getPopularPeople(): Observable<PopularPeopleData> {
    return this.http.get<PopularPeopleData>(
      `${environment.baseUrl}person/popular?api_key=${environment.apiKey}&language=${environment.language}&page=1`
    );
  }
}
