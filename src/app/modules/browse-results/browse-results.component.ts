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

  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getBrowseItems();
  }

  getBrowseItems() {
    this.searchService.searchItems.subscribe((data: any) => {
      console.log(data)
      this.browseItems = data;
      this.browseTerm = this.searchService.getSearchTerm();
      console.log(this.browseTerm)
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    // this.
  }
  
}
