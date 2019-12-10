import { Ingrediant } from "../../shared/ingrediant.model";
import { Action } from "@ngrx/store";

import * as ShoppingListActions from '../actions/shopping-list.actions';

export interface State {
  ingrediants: Ingrediant[];
}

const initialState: State = {
  ingrediants: [
    new Ingrediant("Tomatos", 5),
    new Ingrediant("Onions", 10)
  ]
}

export function ShoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionTypes) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIANT:
      return {
        ...state,
        ingrediants: [...state.ingrediants, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIANTS:
      return {
        ...state,
        ingrediants: [...state.ingrediants, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIANTS:
      return {
        ...state,
        ingrediants: state.ingrediants.map((item, index) => {
          return index == action.payload.index ? action.payload.ingrediant : item;
        })
      }

    case ShoppingListActions.DELETE_INGREDIANTS:
      return {
        ...state,
        ingrediants: state.ingrediants.filter((item, index) => {
          return index != action.payload;
        })
      }

    default:
      return {
        ...state
      }
  }
}
