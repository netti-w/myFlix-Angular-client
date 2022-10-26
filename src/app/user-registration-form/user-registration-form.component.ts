import { Component, OnInit, Input } from '@angular/core';

// close dialog (form) on success
import { MatDialogRef } from '@angular/material/dialog';
// import API call services
import { FetchApiDataService } from '../fetch-api-data.service';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result); // for testing
      this.snackBar.open('User registered successfully', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result); // for testing
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}