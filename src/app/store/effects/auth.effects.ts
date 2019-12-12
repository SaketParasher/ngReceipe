import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import * as AuthActions from '../actions/auth.action';
import { User } from 'src/app/auth/auth/user.model';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const API_KEY = "AIzaSyC3Qa9V7VQiJ0T_Bd3IEJ8IN99V4n0-CM4";

const handleSuccess = (responseData) => {
  // once login is success then we will dispatch Login action from inside not outside because outside
  // observable chain must not die. This action will automatically gets dispatched by ngRx effects
  const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
  const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate)
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.Login({
    email: responseData.email,
    userId: responseData.localId,
    token: responseData.idToken,
    expirationDate: expirationDate
  })
};

const handleError = (errorResponse: any) => {
  let errorMessage = "An Unknown Error Occured!!!!";

  if (errorResponse.error && errorResponse.error.error) {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This Email Already Exists!!!!";
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email Entered is not a valid Email!!!!";
      case 'INVALID_PASSWORD':
        errorMessage = "Password is not Valid for Given Email!!!!";
      case 'EMAIL_EXISTS':
        errorMessage = "Email Alredy Exists!!!!";

      default:
        break;
    }
    return of(new AuthActions.LoginFails(errorMessage))
  } else {
    return of(new AuthActions.LoginFails(errorMessage))
  }

}

// In effects we will react to all the dispatched actions and the actions will be filtered by ofType
// An Effect in the end should dispatch an Action when its done because this effect doesn't change the state itself
//

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypesEnum.SIGNUP_STARTS),
    switchMap((signupData: AuthActions.SignupStarts) => {
      return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
        {
          email: signupData.payload.email,
          password: signupData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map((responseData) => {
          return handleSuccess(responseData);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    // only continue in this observable chain if the Action type is Login_Start and we can add multiple
    // actions seperated by comma if we want to react for multiple actions
    ofType(AuthActions.AuthActionTypesEnum.LOGIN_STARTS),
    switchMap((loginData: AuthActions.LoginStarts) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
        {
          email: loginData.payload.email,
          password: loginData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map((responseData) => {
          return handleSuccess(responseData);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      )
    })
  )

  @Effect({ dispatch: false })
  afterLogin = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypesEnum.LOGIN),
    tap(() => this.router.navigate(['/receipe']))
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypesEnum.AUTO_LOGIN),
    map(() => {
      let userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
      if (loadedUser.token) {
        //this.emitUser.next(loadedUser);
        return new AuthActions.Login(
          {
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate)
          })
      }
      return { type: 'DUMMY' }

    })
  )

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypesEnum.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth'])
    })
  )



}
