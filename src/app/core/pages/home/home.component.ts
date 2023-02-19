import { Component, Output } from '@angular/core';
import { NowPlayingMovies, NowPlayingMoviesData } from 'src/app/shared/models/nowPlayingMovies';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Output() nowPlayingMovies: NowPlayingMovies[] = [];
  @Output() popularMovies: [] = [];

  constructor(private _movieService: MoviesService) { }

  ngOnInit() {
    this.getNowPlaying();
    this.getPopularMovies()
  }

  getNowPlaying(): void {
    this._movieService.getNowPlaying().subscribe((data: NowPlayingMoviesData) => {
      this.nowPlayingMovies = data.results.slice(0, 6);
    });
  }

  getPopularMovies(): void {
    this._movieService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results.slice(0, 16);
    });
  }
}
