import { Component } from '@angular/core';
import { navMediaItems, navMenuItems } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navMenuItems: any[];
  navMediaItems: any[];

  navbarSearchOpen = false;

  constructor() {
    this.navMenuItems = navMenuItems;
    this.navMediaItems = navMediaItems;
  }

  onOpenSidenav() {

  }
  
  toggleNavSearch() {
    this.navbarSearchOpen = !this.navbarSearchOpen;
  }
}
