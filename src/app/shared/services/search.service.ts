import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  category: string = 'multi';

  private showSearchBox$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    public router: Router) { 
      router.events.subscribe(() => {
        this.setSearchBox(false);
      });
    }

  getSearchBox() {
    return this.showSearchBox$.asObservable();
  }

  setSearchBox(state: boolean) {
    this.showSearchBox$.next(state);
  }

  toggleSearchBox() {
    this.showSearchBox$.next(!this.showSearchBox$.value);
  }

  setCategory(value: any) {
    this.category = value;
  }

  search(term: string): Observable<any> {
    if(term === '') {      
      return of([]);
    }
    
    return this.http.get(`${environment.baseUrl}search/${this.category}?api_key=${environment.apiKey}&query=${term}&language=${environment.language}&include_adult=false`)
      .pipe(map((data: any) => {
        return data.results.slice(0, 10)
      }));
  }

}
