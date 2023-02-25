import { Component, Input } from '@angular/core';
import { Genres } from 'src/app/shared/models/genres.model';
import { NowPlayingMovies } from 'src/app/shared/models/nowPlayingMovies';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})

export class HeroCarouselComponent {
  @Input() movies: NowPlayingMovies[] = [];
  @Input() allGenres: Genres[] = [];

  config: SwiperOptions = {
    navigation: true,
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
    },
    speed: 500,
  }

  params: SwiperOptions = {
    injectStyles: [
      `
        :host .swiper-button-next,
        :host .swiper-button-prev  {
          display: block;
          top: 47%;
          width: 23px;
          background-color: rgba(0,0,0, 0.2);
          color: rgba(255,255,255, 0.7);
          padding: 8px;
          border: 1px solid rgba(255,255,255, 0.2);
          border-radius: 5px;
        }
        @media only screen and (max-width: 992px) {
          :host .swiper-button-next,
          :host .swiper-button-prev {
            top: 34%;
            tranform: translateY(-50%);
          }
        }
        @media only screen and (max-width: 600px) {
          :host .swiper-button-next,
          :host .swiper-button-prev {
            display: none;
          }
        }
        :host .swiper-button-next:hover,
        :host .swiper-button-prev:hover {
          background-color: rgba(0,0,0, 0.4);
          color: rgb(255,255,255);
          border: 1px solid rgba(255,255,255, 0.5);
        }
      `
    ],
  };
  
}
