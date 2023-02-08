import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { navMediaItems, navMenuItems } from 'src/app/shared/helpers/helpers';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navMenuItems: any[];
  navMediaItems: any[];

  navbarSearchOpen = false;
  showSearchBox!: Observable<boolean>;

  constructor(private navService: SidebarService) {
    this.navMenuItems = navMenuItems;
    this.navMediaItems = navMediaItems;
  }

  ngOnInit(): void {
    
  }

  onOpenSidenav() {
    this.navService.setSidebar(true);
    this.navbarSearchOpen = false;
  }
  
  toggleNavSearch() {
    this.navbarSearchOpen = !this.navbarSearchOpen;
  }
}
