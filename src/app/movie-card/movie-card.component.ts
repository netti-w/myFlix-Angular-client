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
  username: any = localStorage.getItem('username');
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  };

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  };

  addToFavourites(movieId: String): void {
    console.log(`added to profile: ${movieId}`); // for testing
    this.fetchApiData.addFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

  removeFromFavourites(movieId: String): void {
    console.log(`removed from profile: ${movieId}`); // for testing
    this.fetchApiData.removeFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

  openDirectorDialog(director: Object): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Director: director
      },
      width: '280px'
    });
  };

  openGenreDialog(genre: Object): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Genre: genre
      },
      width: '280px'
    });
  };

  openSinopsisDialog(movie: Object): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Movie: movie
      },
      width: '280px'
    });
  };

  openProfileView(): void {
    this.router.navigate(['profile']);
  };

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  };

}
