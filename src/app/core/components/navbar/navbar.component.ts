import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
  showSearchBox!: Observable<boolean>;

  constructor() {
    this.navMenuItems = navMenuItems;
    this.navMediaItems = navMediaItems;
  }

  ngOnInit(): void {
    
  }

  onOpenSidenav() {

  }
  
  toggleNavSearch() {
    this.navbarSearchOpen = !this.navbarSearchOpen;
  }
}
