import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { Animations } from 'src/app/shared/animations/animations';
import { searchOptions } from 'src/app/shared/helpers/helpers';
import { Genres } from 'src/app/shared/models/genres.model';
import { GenresService } from 'src/app/shared/services/genres.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  animations: [
    Animations.toggleNavSearch
  ]
})

export class SearchBoxComponent implements OnInit {
  searchOptions: any[];
  searchSelector = "Select";
  searching = false;
	searchFailed = false;
  moviesGenres: Genres[] = [];
  tvGenres: Genres[] = [];

  showSearchBox!: Observable<boolean>;

  constructor(
    private searchService: SearchService,
    private _genresService: GenresService) {
    this.searchOptions = searchOptions;
  }

  ngOnInit() {
    this.showSearchBox = this.searchService.getSearchBox();
  }

  closeInsideSearch() {
    this.searchService.setSearchBox(false);
    this.onItemSelected();
  }

  selectCategory(value: string, label: string) {
    this.searchService.setCategory(value);
    this.searchSelector = label;
  }

  getMoviesGenres() {
    this._genresService.getMoviesGenres().subscribe((data: any) => {
      this.moviesGenres = data;
    });
  }

  getTvGenres() {
    this._genresService.getTvGenres().subscribe((data: any) => {
      this.tvGenres = data;
    });
  }

  // ------------------- API ---------------------------
  model!: Observable<any>;

  formatter = (x: {title: string}) => x.title;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
        term.length < 2 ? [] : this.searchService.search(term).pipe(
					tap(() => this.searchFailed = false),
          tap((x) => console.log(x)),
          tap(res => this.searchService.getBrowseItems(res)),
          map(x => x.slice(0, 10)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					}),
				),
			),
			tap(() => (this.searching = false)),
		);

  onItemSelected(): Observable<never> {
    return this.model = EMPTY;
  }

  
  
}


