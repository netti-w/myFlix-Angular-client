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
  editMode: Boolean = false;

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    // console.log(this.user); // for testing
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

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
      this.ngOnInit();
      this.toggleEditUserMode();
    });
  }

  toggleEditUserMode(): void {
    this.editMode = !this.editMode;
    // this.userData = { Username: '', Password: '', Email: '', Birthday: '' }; // clear any inputted data when user cancels
  }

  openMovieView(): void {
    this.router.navigate(['movies']);
  };

  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  };
}
