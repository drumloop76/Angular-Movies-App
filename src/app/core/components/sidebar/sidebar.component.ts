import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animations } from 'src/app/shared/animations/animations';
import { navMenuItems } from 'src/app/shared/helpers/helpers';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    Animations.openCloseSidebar,
    Animations.openCloseDropdown,
    Animations.rotateCaret,
  ]
})

export class SidebarComponent implements OnInit {
  sidebarMenuItems: any[];
  showSidebar!: Observable<boolean>;

  dropdownOpen: boolean = false;

  constructor(private navService: SidebarService) {
    this.sidebarMenuItems = navMenuItems;
  }

  ngOnInit(){
    this.showSidebar = this.navService.getSidebar();
  }

  onCloseSidenav() {
    this.navService.setSidebar(false);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onCloseDropdown() {
    this.dropdownOpen = false;
  }
}
