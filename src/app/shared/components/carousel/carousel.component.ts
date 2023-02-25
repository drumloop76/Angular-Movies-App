import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() items: any[] = [];
  @Input() person: any[] = [];

  config: SwiperOptions = {
    navigation: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 2
      },
      420: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3
      },
      516: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 12,
        slidesPerGroup: 5
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 16,
        slidesPerGroup: 5
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 25,
        slidesPerGroup: 6
      },
    },
  }

  params: SwiperOptions = {
    injectStyles: [
      `
        :host .swiper-button-next,
        :host .swiper-button-prev  {
          display: block;
          top: 35%;
          width: 23px;
          background-color: rgba(0,0,0, 0.2);
          color: rgba(255,255,255, 0.7);
          padding: 8px;
          border: 1px solid rgba(255,255,255, 0.2);
          border-radius: 5px;
        }
        @media only screen and (max-width: 600px) {
          :host .swiper-button-next,
          :host .swiper-button-prev {
            display: none;
          }
        }
        :host .swiper-button-next:hover {
          background-color: rgba(0,0,0, 0.4);
          color: rgb(255,255,255);
          border: 1px solid rgba(255,255,255, 0.5);
        }
      `
    ],
  };
}
