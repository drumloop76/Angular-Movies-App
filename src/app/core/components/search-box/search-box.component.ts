import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { Animations } from 'src/app/shared/animations/animations';
import { searchOptions } from 'src/app/shared/helpers/helpers';
import { Genres } from 'src/app/shared/models/genres.model';
import { GenresService } from 'src/app/shared/services/genres.service';
import { SearchService } from 'src/app/shared/services/search.service';

export enum KEY_CODE {
  ENTER = 13,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

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
    private _searchService: SearchService,
    private _genresService: GenresService,
    private router: Router) {
    this.searchOptions = searchOptions;
  }

  ngOnInit() {
    this.showSearchBox = this._searchService.getSearchBox();
    this.getMoviesGenres();
    this.getTvGenres();
  }

  closeInsideSearch() {
    this._searchService.setSearchBox(false);
    this.onItemSelected();
  }

  selectCategory(value: string, label: string) {
    this._searchService.setCategory(value);
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

  model!: Observable<any>;

  formatter = (x: {title: string}) => x.title;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => (this.searching = true)),
			switchMap((term) =>
        term.length < 2 ? [] : this._searchService.search(term).pipe(
					tap(() => this.searchFailed = false),
          tap(res => this._searchService.getBrowseItems(res)),
          map(x => x.slice(0, 10)),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					}),
				),
			),
			tap(() => (this.searching = false)),
		);

  onSelectItem(event: any) {
    if (event.item.release_date) {
      this.router.navigate(['/movie', event.item.id]);
      this.onItemSelected();
    } else if (event.item.first_air_date) {
      this.router.navigate(['/shows', event.item.id]);
      this.onItemSelected();
    } else if (event.item.known_for_department) {
      this.router.navigate(['/persons', event.item.id]);
      this.onItemSelected();
    } else {
      this.router.navigate([`/page-not-found`]);
      this.onItemSelected();
    }
  }  

  onItemSelected(): Observable<never> {
    return this.model = EMPTY;
  }
  
}


