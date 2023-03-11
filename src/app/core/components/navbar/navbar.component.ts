import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { navMediaItems, navMenuItems } from 'src/app/shared/helpers/helpers';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { SidebarService } from 'src/app/shared/services/sidebar/sidebar.service';
import { traceUntilFirst } from '@angular/fire/performance';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  navMenuItems: any[];
  navMediaItems: any[];

  showSearchBox!: Observable<boolean>;

  showLoginBtn: boolean = false;
  showUserBtn: boolean = false;
  userImg!: string;

  private readonly userDisposable: Subscription | undefined;
  public readonly user: Observable<User | null> = EMPTY;

  constructor(
    private navService: SidebarService, 
    private searchService: SearchService,
    public authService: AuthService,
    @Optional() private auth: Auth,) {
      this.navMenuItems = navMenuItems;
      this.navMediaItems = navMediaItems;

      this.showLoginBtn = !authService.isLoggedIn;
      this.showUserBtn = authService.isLoggedIn;

      if(auth) {
        this.user = authState(this.auth);
        this.userDisposable = authState(this.auth)
          .pipe(
            traceUntilFirst('auth'),
            map(user => {
              if(user && user?.photoURL !== null) {
                const img: string = user!.photoURL
                this.userImg = img;
              }
              !!user
            })
          )
          .subscribe()
      }
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

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

}
