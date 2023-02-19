import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from './pipes/pipe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselBtnsDirective } from './directives/carousel-btns.directive';
import { CarouselComponent } from './components/carousel/carousel.component';



@NgModule({
  declarations: [
    CarouselBtnsDirective,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipeModule,
  ],
  exports: [
    FontAwesomeModule,
    PipeModule,
    CarouselBtnsDirective,
    CarouselComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule { }
