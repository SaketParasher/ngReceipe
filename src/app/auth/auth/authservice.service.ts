import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";


import { User } from "./user.model";

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/actions/auth.action';
import { Store } from '@ngrx/store';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const API_KEY = "AIzaSyC3Qa9V7VQiJ0T_Bd3IEJ8IN99V4n0-CM4"

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  //emitUser = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.createAndEmitUser(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          responseData.expiresIn)
      })
    )
  }

  Login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(responseData => {
        this.createAndEmitUser(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          responseData.expiresIn)
      })
    )
  }

  autoLogin() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if (loadedUser.token) {
      //this.emitUser.next(loadedUser);
      this.store.dispatch(new AuthActions.Login(
        {
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        }))
    }
  }

  Logout() {
    //this.emitUser.next(null);
    this.store.dispatch(new AuthActions.Logout())
    // localStorage.removeItem('userData');
    // this.router.navigate(['/auth']);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          return throwError("This Email Already Exists!!!!")
        case 'EMAIL_NOT_FOUND':
          return throwError("Email Entered is not a valid Email!!!!")
        case 'INVALID_PASSWORD':
          return throwError("Password is not Valid for Given Email!!!!")
        default:
          break;
      }
    } else {
      return throwError("An Unknown Error Occured!!!!")
    }
  }

  private createAndEmitUser(email: string, userId: string, userToken: string, expiresIn: string) {
    let expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    console.log('Date After Which Token Expires');
    console.log(expirationDate);
    let userToEmit = new User(email, userId, userToken, expirationDate);
    //this.emitUser.next(userToEmit);
    this.store.dispatch(new AuthActions.Login({
      email: email,
      userId: userId,
      token: userToken,
      expirationDate: expirationDate
    }))
    localStorage.setItem('userData', JSON.stringify(userToEmit));
  }

}
