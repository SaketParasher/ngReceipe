import { Receipe } from 'src/app/receipe/receipe.model';
import * as ReceipeActions from '../actions/receipe.action';

export interface State {
  receipes: Receipe[]
}

export const initialState: State = {
  receipes: []
}

export function ReceipeReducer(state = initialState, action: ReceipeActions.ReceipeActions) {

  switch (action.type) {
    case ReceipeActions.ReceipeActionTypes.ADD_RECEIPES:
      return {
        ...state,
        receipes: [...state.receipes, ...action.payload]
      }

    default:
      return {
        ...state
      }
  }

}
