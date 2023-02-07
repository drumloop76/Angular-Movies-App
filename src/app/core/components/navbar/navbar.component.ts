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

  constructor() {
    this.navMenuItems = navMenuItems;
    this.navMediaItems = navMediaItems;
  }

  onOpenSidenav() {

  }
  
}
