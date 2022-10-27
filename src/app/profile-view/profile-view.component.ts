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

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('in profile view');
      console.log(this.movies);
      return this.movies;
    });
  };

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favouriteMovies = resp.FavouriteMovies;
      console.log('in profile view');
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  };

  removeFromFavourites(movieId: String): void {
    console.log(`removed from profile: ${movieId}`); // for testing
    this.fetchApiData.removeFavouriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    });
  };

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
  }

  toggleEditUserMode(): void {
    this.editMode = !this.editMode;
  }

  openMovieView(): void {
    this.router.navigate(['movies']);
  };

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  };
}
