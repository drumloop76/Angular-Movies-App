import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private showSidebar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  getSidebar() {
    return this.showSidebar$.asObservable();
  }

  setSidebar(state: boolean) {
    this.showSidebar$.next(state);
  }
    
}
