import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})

export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favouriteMovies: any[] = [];
  editMode: Boolean = false;

  // Defines component's input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
    this.getFavMovies();
  }

  /** 
   * Fetches user object from username saved in localStorage using fetchApiData, and sets local 'user' variable to the resulting object.
   * Also calls getDate() on user.Birthday (see getDate()).
   * Returns 'user' object.
  */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * Fetches movies using fetchApiData and sets local 'movies' variable to resulting array of movies objects.
   * Returns 'movies' array.
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('in profile view');
      console.log(this.movies);
      return this.movies;
    });
  };

  /**
   * Fetches user object by username in localStorage using fetchApiData, and sets local 'favMovies' variable to result's 'FavoriteMovies' propery.
   * Returns 'favouriteMovies' variable.
  */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favouriteMovies = resp.FavouriteMovies;
      console.log('in profile view');
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  };

  /**
   * Removes given movie from current user's favourites, as determined by username in localStorage. 
   * Uses fetchApiData to delete user
   * @param {string} movieId
  */
  removeFromFavourites(movieId: String): void {
    console.log(`removed from profile: ${movieId}`); // for testing
    this.fetchApiData.removeFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

  /**
   * Toggles edit mode on and off by toggling local 'editMode' variable. 
   * Changes user details to edititng mode and vice versa.
  */
  toggleEditUserMode(): void {
    this.editMode = !this.editMode;
  }

  /**
   * Posts new user details entered by the user to their user entry in the database.  
   * sets new username in localStorage if username is changed. 
   * Uses fetchApiData to put new user details
   * ngOnInit() is called and editMode set to false to effectively reload the page on update
  */
  editUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000,
      });
      if (this.userData.Username !== this.user.Username) {
        localStorage.setItem('username', this.userData.Username);
      };
      this.ngOnInit();
      this.toggleEditUserMode();
    });
  };

  /**
   * Removes given movie from current user's favourites, as determined by username in localStorage. 
   * Uses fetchApiData to delete.
  */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((resp: any) => {
      console.log(`user ${this.user.Username} was deleted`);
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
    this.snackBar.open(
      'You have successfully deleted your account!',
      'OK',
      {
        duration: 2000,
      }
    );
  };

  /**
   * routes to profile view when clicked on username
  */
  openMovieView(): void {
    this.router.navigate(['movies']);
  };

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  };
}
