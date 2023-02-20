import { Component, Input } from '@angular/core';
import { Genres } from 'src/app/shared/models/genres.model';
import { NowPlayingMovies } from 'src/app/shared/models/nowPlayingMovies';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss']
})
export class HeroCarouselComponent {
  @Input() movies: NowPlayingMovies[] = [];
  @Input() moviesGenres: Genres[] = [];
  @Input() tvGenres: Genres[] = [];
  
}
