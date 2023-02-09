import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseResultsRoutingModule } from './browse-results-routing.module';
import { BrowseResultsComponent } from './browse-results.component';


@NgModule({
  declarations: [
    BrowseResultsComponent
  ],
  imports: [
    CommonModule,
    BrowseResultsRoutingModule
  ]
})
export class BrowseResultsModule { }
