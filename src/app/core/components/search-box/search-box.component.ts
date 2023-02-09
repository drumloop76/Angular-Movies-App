import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap, tap } from 'rxjs';
import { Animations } from 'src/app/shared/animations/animations';
import { searchOptions } from 'src/app/shared/helpers/helpers';
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

  showSearchBox!: Observable<boolean>;

  constructor(private searchService: SearchService) {
    this.searchOptions = searchOptions;
  }

  ngOnInit(): void {
    this.showSearchBox = this.searchService.getSearchBox();
  }

  closeInsideSearch() {
    this.searchService.setSearchBox(false);
  }

  selectCategory(value: string, label: string) {
    this.searchService.setCategory(value);
    this.searchSelector = label;
  }

  // ------------------- API ---------------------------
  model!: Observable<any>;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? [] : this.searchService.search(term)),
      tap(x => this.searchService.getBrowseItems(x))
    );

  formatter = (x: {title: string}) => x.title;

}


