import { Component } from '@angular/core';
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

  constructor(private navService: SidebarService) {
    this.navMenuItems = navMenuItems;
    this.navMediaItems = navMediaItems;
  }

  onOpenSidenav() {
    this.navService.setSidebar(true);
    this.navbarSearchOpen = false;
  }
  
  toggleNavSearch() {
    this.navbarSearchOpen = !this.navbarSearchOpen;
  }
}
