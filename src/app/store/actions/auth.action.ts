import { Action } from '@ngrx/store';

export enum AuthActionTypesEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_STARTS = 'LOGIN_STARTS',
  LOGIN_FAILS = 'LOGIN_FAILS',
  SIGNUP_STARTS = 'SIGNUP_STARTS',
  CLEAR_ERRORS = 'CLEAR_ERRORS',
  AUTO_LOGIN = 'AUTO_LOGIN'

}

export class Login implements Action {
  readonly type = AuthActionTypesEnum.LOGIN;
  constructor(
    public payload: {
      email: string,
      userId: string,
      token: string,
      expirationDate: Date
    }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypesEnum.LOGOUT;
}

export class LoginStarts implements Action {
  readonly type = AuthActionTypesEnum.LOGIN_STARTS;
  constructor(public payload: { email: string, password: string }) { }
}

export class LoginFails implements Action {
  readonly type = AuthActionTypesEnum.LOGIN_FAILS;
  constructor(public payload: string) { }
}

export class SignupStarts implements Action {
  readonly type = AuthActionTypesEnum.SIGNUP_STARTS;
  constructor(public payload: { email: string, password: string }) { }
}

export class ClearErrors implements Action {
  readonly type = AuthActionTypesEnum.CLEAR_ERRORS;
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypesEnum.AUTO_LOGIN;
}

export type AuthActionTypes = Login | Logout | LoginStarts | LoginFails | SignupStarts | ClearErrors | AutoLogin;
