import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BrowseResultsRoutingModule } from './browse-results-routing.module';
import { BrowseResultsComponent } from './browse-results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BrowseResultsComponent
  ],
  imports: [
    CommonModule,
    BrowseResultsRoutingModule,
    FontAwesomeModule,
    NgOptimizedImage,
  ],
  exports: [
  ]
})
export class BrowseResultsModule { }
