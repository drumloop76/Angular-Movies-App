import { Component, Input } from '@angular/core';
import { NowPlayingMovies } from 'src/app/shared/models/nowPlayingMovies';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent {
  @Input() movies: NowPlayingMovies[] = [];
  
}
