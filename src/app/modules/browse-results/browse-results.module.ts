import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { BrowseResultsRoutingModule } from './browse-results-routing.module';
import { BrowseResultsComponent } from './browse-results.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BrowseResultsComponent
  ],
  imports: [
    CommonModule,
    BrowseResultsRoutingModule,
    NgOptimizedImage,
    SharedModule,
  ],
  exports: [
  ]
})
export class BrowseResultsModule { }
