import { Component, Output } from '@angular/core';
import { Genres } from 'src/app/shared/models/genres.model';
import { NowPlayingMovies, NowPlayingMoviesData } from 'src/app/shared/models/nowPlayingMovies';
import { GenresService } from 'src/app/shared/services/genres.service';
import { MoviesService } from 'src/app/shared/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Output() nowPlayingMovies: NowPlayingMovies[] = [];
  @Output() popularMovies: [] = [];
  @Output() moviesGenres: Genres[] = [];
  @Output() tvGenres: Genres[] = [];

  constructor(
    private _movieService: MoviesService, 
    private _genresService: GenresService,
  ) { }

  ngOnInit() {
    this.getNowPlaying();
    this.getPopularMovies();
    this.getMoviesGenres();
    this.getTvGenres();
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

  getMoviesGenres() {
    this._genresService.getMoviesGenres().subscribe((data: any) => {
      this.moviesGenres = data;
      
    });
  }

  getTvGenres() {
    this._genresService.getTvGenres().subscribe((data: any) => {
      this.tvGenres = data;
    });
  }

}
