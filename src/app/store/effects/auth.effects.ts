import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import * as AuthActions from '../actions/auth.action';


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const API_KEY = "AIzaSyC3Qa9V7VQiJ0T_Bd3IEJ8IN99V4n0-CM4"

// In effects we will react to all the dispatched actions and the actions will be filtered by ofType
// An Effect in the end should dispatch an Action when its done because this effect doesn't change the state itself
//

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

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
          // once login is success then we will dispatch Login action from inside not outside because outside
          // observable chain must not die. This action will automatically gets dispatched by ngRx effects
          const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000)
          return new AuthActions.Login({
            email: responseData.email,
            userId: responseData.localId,
            token: responseData.idToken,
            expirationDate: expirationDate
          })
        }),
        catchError(errorResponse => {
          let errorMessage = "An Unknown Error Occured!!!!";

          if (errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = "This Email Already Exists!!!!";
              case 'EMAIL_NOT_FOUND':
                errorMessage = "Email Entered is not a valid Email!!!!";
              case 'INVALID_PASSWORD':
                errorMessage = "Password is not Valid for Given Email!!!!";
              default:
                break;
            }
            return of(new AuthActions.LoginFails(errorMessage))
          } else {
            return of(new AuthActions.LoginFails(errorMessage))
          }

        })
      )
    })
  )

  @Effect({ dispatch: false })
  afterLogin = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypesEnum.LOGIN),
    tap(() => this.router.navigate(['/receipe']))
  )

}
