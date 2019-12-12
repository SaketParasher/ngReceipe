import * as fromShoppingList from './reducers/shopping-list.reducers';
import * as fromAuth from './reducers/auth.reducer';
import * as fromReceipe from './reducers/receipe.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  receipe: fromReceipe.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
  receipe: fromReceipe.ReceipeReducer
}
