import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { navMediaItems, navMenuItems } from 'src/app/shared/helpers/helpers';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navMenuItems: any[];
  navMediaItems: any[];

  showSearchBox!: Observable<boolean>;

  constructor(
    private navService: SidebarService, 
    private searchService: SearchService) {
      this.navMenuItems = navMenuItems;
      this.navMediaItems = navMediaItems;
    }

  ngOnInit(): void {
    this.showSearchBox = this.searchService.getSearchBox();
  }

  onOpenSidenav() {
    this.navService.setSidebar(true);
  }
  
  onToggleSearchBox() {
    this.searchService.toggleSearchBox();
  }

}
