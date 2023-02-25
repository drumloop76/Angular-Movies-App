import { Component, Output } from '@angular/core';
import { Genres } from 'src/app/shared/models/genres.model';
import { NowPlayingMovies, NowPlayingMoviesData } from 'src/app/shared/models/nowPlayingMovies';
import { PopularPeople, PopularPeopleData } from 'src/app/shared/models/people';
import { PopularMovies, PopularMoviesData } from 'src/app/shared/models/popularMovies';
import { PopularTvShows, PopularTvShowsData } from 'src/app/shared/models/popularTvShows';
import { GenresService } from 'src/app/shared/services/genres.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { PeopleService } from 'src/app/shared/services/people.service';
import { TvShowsService } from 'src/app/shared/services/tv-shows.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Output() nowPlayingMovies: NowPlayingMovies[] = [];
  @Output() popularMovies: PopularMovies[] = [];
  @Output() popularTvShows: PopularTvShows[] = [];
  @Output() popularPeople: PopularPeople[] = [];
  @Output() allGenres: Genres[] = [];

  @Output() personMovieTitles: any [] = []

  constructor(
    private _moviesService: MoviesService,
    private _tvShowsService: TvShowsService,
    private _peopleService: PeopleService, 
    private _genresService: GenresService,
  ) { }

  ngOnInit() {
    this.getNowPlaying();
    this.getPopularMovies();
    this.getPopularTvShows();
    this.getPopularPeople();
    this.getAllGenres();
  }

  getNowPlaying(): void {
    this._moviesService.getNowPlaying().subscribe((data: NowPlayingMoviesData) => {
      this.nowPlayingMovies = data.results;
    });
  }

  getPopularMovies(): void {
    this._moviesService.getPopularMovies().subscribe((data: PopularMoviesData) => {
      this.popularMovies = data.results;
    });
  }

  getPopularTvShows(): void {
    this._tvShowsService.getPopularSeries().subscribe((data: PopularTvShowsData) => {
      this.popularTvShows = data.results;
    });
  }

  getPopularPeople(): void {
    this._peopleService.getPopularPeople().subscribe((data: PopularPeopleData) => {
      let people = data.results;
      people.map((x:any) => {
        x.known_for.some((y:any) => {
          if(y.genre_ids.includes(Number(environment.sciFiGenre)) || y.genre_ids.includes(Number(environment.tvSciFiGenre))) {
            if(this.popularPeople.indexOf(x) === -1) this.popularPeople.push(x)
          }
        })
      })
    });
    
  }

  getAllGenres() {
    this._genresService.getAllGenres().subscribe((data: any) => {
      this.allGenres = data
    });
  }

}
