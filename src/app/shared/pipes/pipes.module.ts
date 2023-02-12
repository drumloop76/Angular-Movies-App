import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreNamePipe } from './genre-name.pipe';



@NgModule({
  declarations: [
    GenreNamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
