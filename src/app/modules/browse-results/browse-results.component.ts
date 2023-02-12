import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-browse-results',
  templateUrl: './browse-results.component.html',
  styleUrls: ['./browse-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BrowseResultsComponent implements OnInit, OnDestroy {
  browseItems: [] = [];
  browseTerm: string = '';

  constructor(private _searchService: SearchService, private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getBrowseItems();
  }

  getBrowseItems() {
    this._searchService.searchItems.subscribe((data: any) => {
      if(data == null) return
      console.log(data)
      this.browseItems = data;
      this.browseTerm = this._searchService.getSearchTerm();
      this._cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    // this.
  }
  
}
