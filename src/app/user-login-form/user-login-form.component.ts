import { Component, OnInit, Input } from '@angular/core';

// import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); //closes modal on success
      console.log(result),
        this.router.navigate(['movies']);
      // this.snackBar.open('You logged in succesfully', 'OK', {
      //   duration: 2000
      // });
    }, (result) => {
      console.log(result); // for testing
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
