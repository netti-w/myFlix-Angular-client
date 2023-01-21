import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://vercel-test-netti-w.vercel.app/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any { // changed type Response to Object
    const body = res;
    return body || {};
  }

  // ------------ user endpoints --------------- //

  /**
   * API call for the user registration
   * @service POST to an API endpoint to register a new user
   * @params {any} userData
   * @returns a new user object in json format
   * @function userRegistration
 */
  public userRegistration(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userData).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * API call for user login
   * @service POST to an API endpoint to login a user
   * @params {any} userDate
   * @returns a new user object in json format with token
  */
  public userLogin(userData: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userData).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * API call to get user info
   * @service GET to an API endpoint to get user info 
   * @returns a new user object in json format
   * @function getUser
  */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to update a user's details
   * @service PUT to an API endpoint to update a user's details
   * @params {any} userData
   * @returns a user object in json format
   * @function updateUser
   */
  public updateUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + 'users/' + username, userData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to add favourite movie to user
   * @service PUT to an API endpoint to add a movie to a user's favourites list
   * @params {any} movieID 
   * @returns a user object in json format
   * @function addFavouriteMovie
   */
  public addFavouriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username')
    return this.http.put(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
 * API call to remove favourite movie from user
 * @service DELETE to an API endpoint to remove a movie from a user's favourites list
 * @params {any} movieID 
 * @returns a user object in json format
 * @function removeFavouriteMovie
 */
  public removeFavouriteMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to delete user
   * @service DELETE to an API endpoint to delete a user
   * @returns success message
   * @function deleteUser
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  // ------------ movies endpoints --------------- //

  /**
   * API call to get all movies
   * @service GET to an API endpoint to get all movies
   * @returns an array of all movies objects in json format
   * @function getAllMovies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to get a single movie by title
   * @service GET to an API endpoint to get a movie by title
   * @param {string} title
   * @returns a movie object in json format
   * @function getMovie
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to get a director by name
   * @service GET to an API endpoint to get a director by name
   * @param {string} director
   * @returns a director object in json format
   * @function getDirector
   */
  public getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors' + director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  /**
   * API call to get a genre by name
   * @service GET to an API endpoint to get a genre by name
   * @param {string} genre
   * @returns a genre object in json format
   * @function getGenre
  */
  public getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres' + genre, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

  // ------------ error handling --------------- //

  /**
   * Function handling errors
   * @param error
   * @returns an error status code and error body
   * @function handleError
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}


