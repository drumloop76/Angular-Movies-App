import { Component } from '@angular/core';
import { navMenuItems } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarMenuItems: any[];

  dropdownOpen: boolean = false;

  constructor() {
    this.sidebarMenuItems = navMenuItems;
  }


  onCloseSidenav() {
    
  }

  toggleDropdown() {

  }

  onCloseDropdown() {
    
  }
}
