import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from './pipes/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipeModule,
  ],
  exports: [
    FontAwesomeModule,
    PipeModule,
  ]
})

export class SharedModule { }
