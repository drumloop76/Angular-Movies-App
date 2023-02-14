import { Component } from '@angular/core';
import { navMediaItems } from 'src/app/shared/helpers/helpers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  mediaLinks: any[] = [];

  constructor() {
    this.mediaLinks = navMediaItems;
  }
}
