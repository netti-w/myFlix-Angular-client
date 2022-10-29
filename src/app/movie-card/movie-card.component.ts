import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';


import { MatDialog } from '@angular/material/dialog';
import { BinaryOperator } from '@angular/compiler';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favouriteMovies: any[] = [];
  username: any = localStorage.getItem('username');
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  };

  /**
   * Fetches movies using fetchApiData and sets 'movies' variable to resulting array of movies objects.
   * Returns 'movies' array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  };

  /**
   * Fetches user object by username using fetchApiData, and sets 'favouriteMovies' variable to result's 'FavouriteMovies' propery.
   * Returns 'favouriteMovies' array.
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favouriteMovies = resp.FavouriteMovies;
      return this.favouriteMovies;
    });
  };

  /**
   * Adds given movie to current user's favourites, as determined by username in localStorage. 
   * Uses fetchApiData to post.
   * @param {string} movieId
   */
  addToFavourites(movieId: String): void {
    // console.log(`added to profile: ${movieId}`); // for testing
    this.fetchApiData.addFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

  /**
   * Removes given movie from current user's favourites, as determined by username in localStorage. 
   * Uses fetchApiData to delete user
   * @param {string} movieId
  */
  removeFromFavourites(movieId: String): void {
    // console.log(`removed from profile: ${movieId}`); // for testing
    this.fetchApiData.removeFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

  /**
   * Tests whether or not a given movie is included in current list of favourites, stored in local variable 'favouriteMovies'.
   * @param {string} id
   * @returns Boolean representing whether movie is in favourites list
  */
  isFavouriteMovie(id: String): Boolean {
    return this.favouriteMovies.includes(id);
  }

  /**
   * opens the director dialog with click on director name
  */
  openDirectorDialog(director: Object): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Director: director
      },
      width: '280px'
    });
  };

  /**
   * opens the genre dialog with click on 'Genre'
  */
  openGenreDialog(genre: Object): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Genre: genre
      },
      width: '280px'
    });
  };

  /**
   * opens the synopsis dialog with click on 'Synopsis'
  */
  openSinopsisDialog(movie: Object): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Movie: movie
      },
      width: '280px'
    });
  };

  /**
   * routes to profile view when clicked on username
  */
  openProfileView(): void {
    this.router.navigate(['profile']);
  };

  /**
   * routes to welcome page and deletes localStorage of logged-in user
  */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  };

}
