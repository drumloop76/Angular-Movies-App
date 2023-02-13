import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Genres } from 'src/app/shared/models/genres.model';
import { GenresService } from 'src/app/shared/services/genres.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrowseResultsComponent implements OnInit, OnDestroy {
  browseItems: any[] = [];
  browseTerm: string = '';
  moviesGenres: Genres[] = [];
  tvGenres: Genres[] = [];
  headerMovies: boolean = false;
  headerTvShow: boolean = false;
  headerPeaople: boolean = false;

  constructor(
    private _searchService: SearchService, 
    private _cdr: ChangeDetectorRef,
    private _genresService: GenresService) {}

  ngOnInit() {
    this.getBrowseItems();
    this.getMoviesGenres();
    this.getTvGenres();
  }

  getBrowseItems() {
    this._searchService.searchItems.subscribe((data: any) => {
      if(data == null) return
      this.browseItems = data;
      console.log(this.browseItems)
      this.browseTerm = this._searchService.getSearchTerm();
      this.hideHeader()
      this._cdr.detectChanges();
    })
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

  hideHeader() {
    const arr = this.browseItems
    if(arr.some((x: any) => x.release_date)) this.headerMovies = true;
    if(arr.some((x: any) => x.first_air_date)) this.headerTvShow = true;
    if(arr.some((x: any) => x.known_for_department)) this.headerPeaople = true;
  }

  ngOnDestroy() {
    
  }
  
}