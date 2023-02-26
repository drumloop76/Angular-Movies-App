import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PipeModule } from './pipes/pipe.module';
import { register } from 'swiper/element/bundle';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SwiperCarouselDirective } from './directives/swiper-carousel.directive';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCaretDown, faMagnifyingGlass, faShareNodes, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faGoogle, faInstagram, faTwitter, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { ToastComponent } from './components/toast/toast/toast.component';




@NgModule({
  declarations: [
    CarouselComponent,
    SwiperCarouselDirective,
    ToastComponent,
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
    CarouselComponent,
    SwiperCarouselDirective,
    ToastComponent,
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
      faEye,
      faEyeSlash
    )
  }
}
