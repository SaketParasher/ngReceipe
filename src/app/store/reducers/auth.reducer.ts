import { User } from 'src/app/auth/auth/user.model';
import * as AuthActions from '../actions/auth.action';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function AuthReducer(state = initialState, action: AuthActions.AuthActionTypes) {
  switch (action.type) {
    case AuthActions.AuthActionTypesEnum.LOGIN:
      return {
        ...state,
        user: new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate),
        loading: false
      }

    case AuthActions.AuthActionTypesEnum.LOGOUT:
      return {
        ...state,
        user: null
      }

    case AuthActions.AuthActionTypesEnum.LOGIN_STARTS:
      return {
        ...state,
        authError: null,
        loading: true
      }

    case AuthActions.AuthActionTypesEnum.LOGIN_FAILS:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }

    default:
      return {
        ...state
      }
  }
}
