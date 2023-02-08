import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { searchOptions } from 'src/app/shared/helpers/helpers';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent {
  searchOptions: any[];
  searchSelector = "Select";

  constructor(private searchService: SearchService) {
    this.searchOptions = searchOptions;
  }

  selectCategory(value: string, label: string) {
    this.searchService.setCategory(value);
    this.searchSelector = label;
  }

  closeInsideSearch() {

  }

  // ------------------- API ---------------------------
  model!: Observable<any>;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? [] : this.searchService.search(term))     
    );

  formatter = (x: {title: string}) => x.title;

}


