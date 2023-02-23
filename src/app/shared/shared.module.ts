import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PipeModule } from './pipes/pipe.module';
// import { CarouselBtnsDirective } from './directives/carousel-btns.directive';
import { register } from 'swiper/element/bundle';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SwiperCarouselDirective } from './directives/swiper-carousel.directive';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCaretDown, faMagnifyingGlass, faShareNodes, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGoogle, faInstagram, faTwitter, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';




@NgModule({
  declarations: [
    // CarouselBtnsDirective,
    CarouselComponent,
    SwiperCarouselDirective
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipeModule,
    NgOptimizedImage,
  ],
  exports: [
    FontAwesomeModule,
    PipeModule,
    // CarouselBtnsDirective,
    CarouselComponent,
    SwiperCarouselDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule { 
  constructor(library: FaIconLibrary) {
    register();
    library.addIcons(
      faBars,
      faXmark,
      faMagnifyingGlass,
      faUser,
      faShareNodes,
      faYoutubeSquare,
      faFacebook,
      faTwitter,
      faInstagram,
      faGoogle,
      faCaretDown,
      faStar,
    )
  }
}
