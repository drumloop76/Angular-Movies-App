import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreNamePipe } from './genre-name.pipe';
import { FirstNamePipe } from './first-name.pipe';


@NgModule({
  declarations: [
    GenreNamePipe,
    FirstNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenreNamePipe,
    FirstNamePipe
  ]
})

export class PipeModule { }
